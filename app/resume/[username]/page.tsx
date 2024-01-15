"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface GitHubProfile {
  name: string;
  bio: string;
  blog: string;
  login: string;
  avatar_url: string;
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
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const fetchProfileAndRepos = async () => {
      try {
        const profileRes = await fetch(
          `https://api.github.com/users/${username}`
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

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

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div
        className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100
 shadow-md p-6 max-w-4xl"
      >
        <div className="flex flex-col items-center">
          <Image
            src={profile.avatar_url}
            alt="Profile"
            className="rounded-full mb-4"
            width={124}
            height={24}
          />
          <h1 className="text-3xl font-bold text-center">
            {profile.name || profile.login}
          </h1>
          <p className="text-center">{profile.bio}</p>
          <a
            href={profile.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {profile.blog}
          </a>
        </div>

        <h2 className="text-2xl mt-5 mb-2 text-center">Repositories</h2>
        <ul className="list-disc pl-5">
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
    </div>
  );
};

export default Resume;
