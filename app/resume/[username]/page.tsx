"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";

const PageLayout = styled.div`
  display: flex;
  width: 100%;
`;

const Sidebar = styled.div`
  width: 250px;
  border-right: 1px solid #ddd;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

interface GitHubProfile {
  name?: string;
  bio?: string;
  blog?: string;
  login?: string;
  avatar_url?: string;
  repos_url?: string;
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
  const [showName, setShowName] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [showBlog, setShowBlog] = useState(true);
  const [showRepos, setShowRepos] = useState(true);

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
    <div className="flex w-full">
      <div className="w-64 border-r border-gray-300 p-4">
        <p className="mb-4">Customize Display:</p>
        <div className="flex flex-col">
          <label>
            <input
              type="checkbox"
              checked={showName}
              onChange={() => setShowName(!showName)}
            />
            Show Name
          </label>
          <label>
            <input
              type="checkbox"
              checked={showBio}
              onChange={() => setShowBio(!showBio)}
            />
            Show Bio
          </label>
          <label>
            <input
              type="checkbox"
              checked={showBlog}
              onChange={() => setShowBlog(!showBlog)}
            />
            Show Blog
          </label>
          <label>
            <input
              type="checkbox"
              checked={showRepos}
              onChange={() => setShowRepos(!showRepos)}
            />
            Show Repositories
          </label>
        </div>
      </div>
      <div className="flex-grow p-4">
        <div className="container mx-auto flex justify-center">
          <div className="h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 shadow-md p-6 max-w-4xl">
            <div className="flex flex-col items-center">
              <Image
                src={profile.avatar_url || ""}
                alt="Profile"
                className="rounded-full mb-4"
                width={124}
                height={124}
              />
              {showName && (
                <h1 className="text-3xl font-bold text-center">
                  {profile.name || profile.login}
                </h1>
              )}
              {showBio && <p className="text-center">{profile.bio}</p>}
              {showBlog && (
                <a
                  href={profile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.blog}
                </a>
              )}
            </div>

            {showRepos && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
