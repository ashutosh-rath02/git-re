"use client";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconFolder,
  IconGitCommit,
  IconGitFork,
  IconWorld,
  IconMail,
  IconStar,
  IconUsers,
  IconTimeline,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/consts";
import {
  fetchLanguageData,
  fetchPopularRepos,
  fetchUserStats,
  fetchOrganizations,
  fetchContributions,
} from "@/utils/resumeUtils";
import { calculateRating } from "@/utils/rating/action";
import { getIndividualUserRank } from "@/app/leaderboard/action";
import { useParams } from "next/navigation";
import GitHubCalendar from "react-github-calendar";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { getRankSuffix } from "@/utils/format";
interface GitHubProfile {
  name: string;
  bio: string;
  blog?: string;
  login: string;
  avatar_url: string;
  repos_url: string;
  created_at: string;
}
interface GitHubData {
  followers: number;
  publicRepos: number;
  starsReceived: number;
  forks: number;
  totalCommits: number;
  organizations: number;
  totalIssues: number;
  totalPRsMerged: number;
  userJoinedDate: Date;
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
interface OrganizationsProps {
  username: string;
  count: number;
}

interface ContributionsProps {
  organizationName: string;
  repository: string;
  url: string;
  repoUrl: string;
  commitCount: number;
}

export function NewResume() {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languageData, setLanguageData] = useState({});

  const [showName, setShowName] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [showBlog, setShowBlog] = useState(true);
  const [showRepos, setShowRepos] = useState(true);
  const [showRepoOptions, setShowRepoOptions] = useState(false);
  const [repoCount, setRepoCount] = useState(5);
  const [showLanguageChart, setShowLanguageChart] = useState(true);
  const [showOtherBox, setShowOtherBox] = useState(true);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());
  const [showContributionGraph, setShowContributionGraph] = useState(true);
  const [showContributions, setShowContributions] = useState(true);
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [contributionCount, setContributionCount] = useState(5);
  const [organizationCount, setOrganizationCount] = useState(5);
  const [rating, setRating] = useState<number>();
  const [rank, setRank] = useState<number>();
  const [organizations, setOrganizations] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [contributions, setContributions] = useState<ContributionsProps[]>([]);
  const [userStats, setUserStats] = useState<GitHubData>({
    followers: 0,
    publicRepos: 0,
    starsReceived: 0,
    forks: 0,
    totalCommits: 0,
    organizations: 0,
    totalIssues: 0,
    totalPRsMerged: 0,
    userJoinedDate: new Date(),
  });
  const { theme } = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if profile data is cached
        const cachedProfileData = await redis.get(`profile:${username}`);
        if (cachedProfileData) {
          setProfile(cachedProfileData as any);
        } else {
          // Fetch profile data and cache it
          const profileData = await fetch(
            `https://api.github.com/users/${username}`
          ).then((res) => res.json());
          setProfile(profileData);
          await redis.set(`profile:${username}`, JSON.stringify(profileData), {
            ex: CACHE_TTL,
          });
        }

        const reposData = await fetchPopularRepos(username);
        setRepos(reposData as unknown as GitHubRepo[]);

        const languages = await fetchLanguageData(username);
        setLanguageData(languages);

        const stats = await fetchUserStats(username);
        setUserStats(stats);

        const rating = await calculateRating(username);
        setRating(rating);

        const orgsData = await fetchOrganizations(username);
        setOrganizations(orgsData);

        const rank = (await getIndividualUserRank(username))[0].user_rank;
        setRank(rank);

        const contributionsData = await fetchContributions(username);
        setContributions(
          contributionsData.slice(0, contributionCount).map((contribution) => ({
            organizationName: contribution.organizationName,
            repository: contribution.repository,
            url: contribution.url,
            repoUrl: contribution.repoUrl,
            commitCount: contribution.commitCount,
          }))
        );
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username, startYear, endYear, organizationCount]);
  useEffect(() => {
    const fetchAndSetOrganizations = async () => {
      try {
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };

    fetchAndSetOrganizations();
  }, [organizationCount]);

  const handleRepoCountChange = (value: number) => {
    setRepoCount(value);
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-6">
        <div className="loader-container flex items-center justify-center">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
        </div>
        <p>We are fetching your data...</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            {profile?.avatar_url && (
              <Image
                src={profile.avatar_url}
                alt={profile.name}
                width={64}
                height={64}
                className="rounded-md w-32 h-32"
              />
            )}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              {profile?.name || profile?.login}
            </h1>
            <div className="flex items-center gap-2">
              <Link
                className={badgeVariants({ variant: "outline" })}
                href={
                  "https://github.com/ashutosh-rath02/git-re/blob/main/FAQs/rating.md"
                }
              >
                {rating} / 5
              </Link>
              <Link
                className={badgeVariants({ variant: "outline" })}
                href={
                  "https://github.com/ashutosh-rath02/git-re/blob/main/FAQs/rating.md"
                }
              >
                {rank}
                {getRankSuffix(rank)} on Leaderboard
              </Link>
            </div>

            {/* <p className="text-lg text-gray-500 dark:text-gray-400">
              Software Engineer
            </p> */}
          </div>
          <div className="prose max-w-none">
            <p>{profile?.bio}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <IconWorld className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              {profile?.blog && (
                <Link
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 truncate"
                  href={profile?.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile?.blog &&
                    (profile?.blog)
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2">
              <IconBrandGithub className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {username}
              </Link>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Skills
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Array.isArray(languageData) && languageData.length > 0 ? (
                languageData.map((language: Language) => (
                  <div className="flex items-center gap-2" key={language.name}>
                    <IconCode className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                        {language.name}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-800">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${language.percent}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No language data available.</p>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              GitHub Stats
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <IconStar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Stars
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userStats.starsReceived}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconGitFork className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Forks
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userStats.forks}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconGitCommit className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Commits
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userStats.totalCommits}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconFolder className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Repositories
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userStats.publicRepos}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconUsers className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Followers
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {userStats.followers}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconTimeline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Years on GitHub
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().getFullYear() -
                      new Date(userStats.userJoinedDate).getFullYear()}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Contribution Graph
              </h2>
              <div className="mt-4 w-full h-full">
                <BarChartComponent className="aspect-[4/3]" />
              </div> */}
              <GitHubCalendar
                username={username}
                colorScheme={theme === "dark" ? "dark" : "light"}
                hideTotalCount={true}
                hideColorLegend={true}
              />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Key Repositories
            </h2>

            <div className="mt-4 space-y-4">
              {repos.slice(0, repoCount).map((repo) => (
                <div className="flex items-center gap-4" key={repo.id}>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      <Link
                        className="hover:underline"
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {repo.description}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconStar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {repo.popularity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {organizations.length > 0 && (
              <>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  Organizations
                </h2>

                <div className="mt-4 space-y-4">
                  {organizations
                    .slice(0, organizationCount)
                    .map((org: any, index: any) => (
                      <div className="flex items-center gap-4" key={index}>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                            <Link
                              className="hover:underline"
                              href={`https://github.com/${org.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {org.name}
                            </Link>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {org.description}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
          <div>
            {contributions.length > 0 && (
              <>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                  Contributions
                </h2>

                <div className="mt-4 space-y-4">
                  {contributions.map((contri, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                          <Link className="hover:underline" href={"#"}>
                            {contri.organizationName}/{contri.repository}
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          has contributed to{" "}
                          <strong>{contri.repository}</strong> with{" "}
                          <Link
                            className="hover:underline"
                            href={contri.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contri.commitCount} commit(s)
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconGitCommit className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contri.commitCount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
