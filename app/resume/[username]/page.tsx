"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { fetchPopularRepos } from "../resumeUtils";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

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
  const [showName, setShowName] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [showBlog, setShowBlog] = useState(true);
  const [showRepos, setShowRepos] = useState(true);
  const [showRepoOptions, setShowRepoOptions] = useState(false);
  const [repoCount, setRepoCount] = useState(5);
  const [showRepoInput, setShowRepoInput] = useState(false);

  const toggleRepoOptions = () => {
    if (!showRepoOptions) {
      setShowRepoInput(false);
      setTimeout(() => setShowRepoInput(true), 10);
      setShowRepoInput(false);
    }
    setShowRepoOptions(!showRepoOptions);
  };

  useEffect(() => {
    const fetchProfileAndRepos = async () => {
      try {
        const profileRes = await fetch(
          `https://api.github.com/users/${username}`
        );
        const profileData = await profileRes.json();
        setProfile(profileData);

        const reposData = await fetchPopularRepos(username);
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

  const handleRepoCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setRepoCount(value);
    }
  };

  return (
    <div className="flex w-full">
      <div className="w-64 border-r border-gray-300 p-4 space-y-4">
        <p className="text-lg font-semibold">Customize Display:</p>
        <div className="flex flex-col space-y-2">
          {/* Checkboxes for Name, Bio, Blog */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showName}
              onChange={() => setShowName(!showName)}
            />
            <span>Show Name</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showBio}
              onChange={() => setShowBio(!showBio)}
            />
            <span>Show Bio</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showBlog}
              onChange={() => setShowBlog(!showBlog)}
            />
            <span>Show Blog</span>
          </label>

          {/* Repositories with Dropdown */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showRepos}
              onChange={() => setShowRepos(!showRepos)}
            />
            <span className="" onClick={toggleRepoOptions}>
              Show Repositories
            </span>
            <ChevronRightIcon
              style={{
                cursor: "pointer",
                transform: showRepoOptions ? "rotate(90deg)" : "none",
                transition: "transform 0.2s ease-in-out",
              }}
              height={18}
              width={18}
              onClick={toggleRepoOptions}
            />
          </div>
          {showRepoOptions && (
            <div
              className="pl-6"
              style={{
                opacity: showRepoInput ? 1 : 0,
                transition: "opacity 0.2s ease-in-out 0.2s",
              }}
            >
              <Input
                value={repoCount}
                onChange={handleRepoCountChange}
                className="border border-gray-400 rounded p-1 w-24"
              />
            </div>
          )}
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
                  {profile.name ? profile.name : profile && profile.login}
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
                  {repos.slice(0, repoCount).map((repo) => (
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
