"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// Define TypeScript interfaces for the GitHub user profile and repositories
interface GitHubProfile {
  name: string;
  bio: string;
  blog: string;
  login: string;
  repos_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
}

const Resume = () => {
  // Extract the username from the URL parameters
  const { username } = useParams<{ username: string }>();

  // State for storing the GitHub user's profile and repositories
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    // Define a function to fetch the user's profile and repositories
    const fetchProfileAndRepos = async () => {
      try {
        // Fetch the user's profile from the GitHub API
        const profileRes = await fetch(
          `https://api.github.com/users/${username}`
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

        // Fetch the user's repositories using the 'repos_url' from their profile
        const reposRes = await fetch(profileData.repos_url);
        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    if (username) {
      fetchProfileAndRepos();
    }
  }, [username]);

  // Render a loading message if the profile data is not yet available
  if (!profile) {
    return <div>Loading...</div>;
  }

  // Render the user's profile and repository information
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{profile.name || profile.login}</h1>
      <p>{profile.bio}</p>
      <a
        href={profile.blog}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {profile.blog}
      </a>

      <h2 className="text-2xl mt-5 mb-2">Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="mt-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {repo.name}
            </a>
            <p>{repo.description}</p>
            <p className="text-sm">Language: {repo.language}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resume;
