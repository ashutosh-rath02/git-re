"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import StatsBox from "@/components/StatsBox";
import Sidebar from "@/components/Sidebar";
import {
  fetchPopularRepos,
  fetchLanguageData,
  fetchUserStats,
} from "@/utils/resumeUtils";
import LanguageBarChart from "@/components/LanguageChart";
import ContributionGraph from "@/components/ContributionGraph";
import Contributions from "@/components/Contributions";
import Organizations from "@/components/Organizations";
import { Separator } from "@/components/ui/separator";

interface GitHubProfile {
  name: string;
  bio: string;
  blog: string;
  login: string;
  avatar_url: string;
  repos_url: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  homepage?: string;
  watchers: number;
  forks: number;
  popularity: number;
  watchersLabel: string;
  forksLabel: string;
  isOwner: boolean;
  date: number;
}

interface Language {
  name: string;
  popularity: number;
  url: string;
  percent: number;
}

const Resume = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languageData, setLanguageData] = useState({});
  const [userStats, setUserStats] = useState({});
  const [showName, setShowName] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [showBlog, setShowBlog] = useState(true);
  const [showRepos, setShowRepos] = useState(true);
  const [showRepoOptions, setShowRepoOptions] = useState(false);
  const [repoCount, setRepoCount] = useState(3);
  const [showLanguageChart, setShowLanguageChart] = useState(true);
  const [showOtherBox, setShowOtherBox] = useState(true);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());
  const [showContributionGraph, setShowContributionGraph] = useState(true);
  const [showContributions, setShowContributions] = useState(true);
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [contributionCount, setContributionCount] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetch(
        `https://api.github.com/users/${username}`
      ).then((res) => res.json());
      setProfile(profileData);

      const reposData = await fetchPopularRepos(username);
      setRepos(reposData as unknown as GitHubRepo[]);

      const languages = await fetchLanguageData(username);
      setLanguageData(languages);

      const stats = await fetchUserStats(username);
      setUserStats(stats);
    };

    if (username) {
      fetchData();
    }
  }, [username, startYear, endYear]);

  const handleRepoCountChange = (value: number) => {
    setRepoCount(value);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <Sidebar
        showName={showName}
        setShowName={setShowName}
        showBio={showBio}
        setShowBio={setShowBio}
        showBlog={showBlog}
        setShowBlog={setShowBlog}
        showRepos={showRepos}
        setShowRepos={setShowRepos}
        showRepoOptions={showRepoOptions}
        setShowRepoOptions={setShowRepoOptions}
        repoCount={repoCount}
        setRepoCount={handleRepoCountChange}
        showLanguageChart={showLanguageChart}
        setShowLanguageChart={setShowLanguageChart}
        showOtherBox={showOtherBox}
        setShowOtherBox={setShowOtherBox}
        setStartYear={setStartYear}
        setEndYear={setEndYear}
        showContributions={showContributions}
        setShowContributions={setShowContributions}
        showContributionGraph={showContributionGraph}
        setShowContributionGraph={setShowContributionGraph}
        showOrganizations={showOrganizations}
        setShowOrganizations={setShowOrganizations}
        contributionCount={contributionCount}
        setContributionCount={setContributionCount}
      />
      <div className="flex-grow p-4 ">
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

            <div className="flex w-full mt-6 gap-2">
              {showLanguageChart && (
                <div className="flex-1 w-1/2 h-full">
                  <LanguageBarChart languages={languageData as Language[]} />
                </div>
              )}
              {showOtherBox && (
                <div className="flex-1 h-full">
                  <StatsBox username={username} />
                </div>
              )}
            </div>
            <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />

            {showRepos && (
              <div className="mt-5 px-2">
                <h2 className="text-2xl mb-4 font-bold underline text-left text-white">
                  Popular Repositories
                </h2>
                <ul className="list-disc px-4">
                  {repos.slice(0, repoCount).map((repo) => (
                    <li key={repo.id} className="mt-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-500 underline"
                          >
                            {repo.name}
                          </a>
                          <span className="text-sm text-white ">
                            ({repo.date})
                          </span>
                        </div>
                        {repo.homepage && (
                          <>
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline pb-1"
                            >
                              {repo.homepage}
                            </a>
                          </>
                        )}
                        <p className="text-gray-200">
                          <span className="font-semibold">{repo.language}</span>
                          &nbsp;-&nbsp;
                          {repo.isOwner ? "Owner" : "Contributor"}
                        </p>
                        <p className="text-gray-400 text-sm">
                          This repository has&nbsp;
                          <span className="font-semibold">{repo.watchers}</span>
                          {repo.watchersLabel} and&nbsp;
                          <span className="font-semibold">{repo.forks}</span>
                          {repo.forksLabel}. If you would like more information
                          about this repository and my contributed code, please
                          visit the
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline ml-1"
                          >
                            repository&nbsp;
                          </a>
                          on GitHub.
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showContributionGraph && (
              <>
                <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                <ContributionGraph username={username} />
              </>
            )}
            {showContributions && (
              <>
                <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                <Contributions
                  username={username}
                  contributionCount={contributionCount}
                />
              </>
            )}
            {showOrganizations && (
              <>
                <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                <Organizations username={username} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
