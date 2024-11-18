"use client";
import {
  IconBrandGithub,
  IconCode,
  IconFolder,
  IconGitCommit,
  IconGitFork,
  IconWorld,
  IconStar,
  IconUsers,
  IconTimeline,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
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
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { badgeVariants } from "./ui/badge";
import { getRankSuffix } from "@/utils/format";
import CustomisationDrawer from "./CustomisationDrawer";
import ProfileTracking from "./ProfileTracking";
import ShareBtn from "./ShareBtn";
import { Skeleton } from "./ui/skeleton";

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
  const [repoCount, setRepoCount] = useState(5);
  const [contributionCount, setContributionCount] = useState(3);
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
      if (!username) return;

      try {
        setLoading(true);

        // Fetch profile data
        const profileData = await fetch(
          `https://api.github.com/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              Accept: "application/vnd.github+json",
            },
          }
        ).then((res) => res.json());
        setProfile(profileData);

        // Fetch data using resumeUtils functions, parallelly
        const [reposData, languages, stats, orgsData, contributionData] =
          await Promise.all([
            fetchPopularRepos(username),
            fetchLanguageData(username),
            fetchUserStats(username),
            fetchOrganizations(username),
            fetchContributions(username),
          ]);

        setRepos(reposData as any);
        setLanguageData(languages);
        setUserStats(stats as any);
        setOrganizations(orgsData);
        setContributionCount(contributionData.length);
        setContributions(
          contributionData.slice(0, contributionCount).map((contribution) => ({
            organizationName: contribution.organizationName,
            repository: contribution.repository,
            url: contribution.url,
            repoUrl: contribution.repoUrl,
            commitCount: contribution.commitCount,
          }))
        );

        // Fetch rating and rank
        const rating = await calculateRating(username);
        setRating(rating);

        const rank = (await getIndividualUserRank(username))[0].user_rank;
        setRank(rank);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleRepoCountChange = (value: number) => {
    setRepoCount(value);
  };
  if (loading) {
    return (
      <div className="loaderbody flex justify-center items-center mt-20 mb-20">
        <div>
          <div className="flex items-center space-x-4 mb-5">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[185px]" />
            </div>
          </div>
          <div className="flex flex-col space-y-3 mb-4">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-end gap-2 mb-4">
          <ProfileTracking username={username} />
          <CustomisationDrawer
            contributions={contributionCount}
            setContributions={setContributionCount}
            organisations={organizationCount}
            setOrganisations={setOrganizationCount}
            isContributionsExists={contributions.length > 0}
            isOrganisationsExists={organizations.length > 0}
          />
          <ShareBtn username={username} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              {profile?.avatar_url && (
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  width={128}
                  height={128}
                  className="rounded-md"
                  quality={100}
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
                  {rating?.toFixed(2)} / 5
                </Link>
                <Link
                  className={badgeVariants({ variant: "outline" })}
                  href={"/leaderboard"}
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
              {profile?.blog && (
                <div className="flex items-center gap-2">
                  <IconWorld className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <Link
                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 truncate"
                    href={
                      profile.blog.includes("http")
                        ? profile.blog
                        : `https://${profile.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile?.blog &&
                      (profile?.blog)
                        .replace(/^https?:\/\//, "")
                        .replace(/\/$/, "")}
                  </Link>
                </div>
              )}
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
                    <div
                      className="flex items-center gap-2"
                      key={language.name}
                    >
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
              {contributions.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                    Contributions
                  </h2>

                  <div className="mt-4 space-y-4">
                    {contributions
                      .slice(0, contributionCount)
                      .map((contri, index) => (
                        <div className="flex items-center gap-4" key={index}>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                              <Link
                                className="hover:underline"
                                href={contri.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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
          </div>
        </div>
      </div>
    </>
  );
}
