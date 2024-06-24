import { GraphQLClient, gql } from 'graphql-request';
import { CACHE_TTL } from "@/lib/consts";
import { supabaseBrowser } from "./supabase/client";

const client = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const supabase = supabaseBrowser();

const GITHUB_QUERY = gql`
  query($username: String!) {
    user(login: $username) {
      login
      name
      avatarUrl
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          name
          id
          url
          description
          homepageUrl
          stargazerCount
          forkCount
          createdAt
          primaryLanguage {
            name
          }
          owner {
            login
          }
        }
      }
      organizations(first: 100) {
        totalCount
        nodes {
          login
          url
          createdAt
        }
      }
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
      }
      issues(first: 1) {
        totalCount
      }
      pullRequests(first: 1) {
        totalCount
      }
      createdAt
    }
  }
`;

const configData = {
  maxItems: 6,
  maxLanguages: 5,
};

interface Repo {
  name: string;
  id: string;
  date: string;
  html_url: string;
  language?: string;
  description?: string;
  homepage?: string;
  username: string;
  watchers: number;
  forks: number;
  popularity: number;
  watchersLabel: string;
  forksLabel: string;
  isOwner: boolean;
}

interface Language {
  name: string;
  popularity: number;
  percent: number;
  url: string;
}

export interface Organization {
  name: string;
  url: string;
  joinedYear: number;
}

interface GitHubUser {
  login: string;
  name: string;
  avatarUrl: string;
  followers: { totalCount: number };
  following: { totalCount: number };
  repositories: {
    totalCount: number;
    nodes: Array<{
      name: string;
      id: string;
      url: string;
      description: string | null;
      homepageUrl: string | null;
      stargazerCount: number;
      forkCount: number;
      createdAt: string;
      primaryLanguage: { name: string } | null;
      owner: { login: string };
    }>;
  };
  organizations: {
    totalCount: number;
    nodes: Array<{
      login: string;
      url: string;
      createdAt: string;
    }>;
  };
  contributionsCollection: {
    totalCommitContributions: number;
    restrictedContributionsCount: number;
  };
  issues: { totalCount: number };
  pullRequests: { totalCount: number };
  createdAt: string;
}

interface GitHubData {
  user: GitHubUser;
}

const fetchGitHubData = async (username: string): Promise<GitHubData | null> => {
  try {
    console.log(`Fetching GitHub data for ${username}`);
    const data = await client.request(GITHUB_QUERY, { username });
    return data;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
};

export const fetchOrganizations = async (username: string): Promise<Organization[]> => {
  const data = await fetchGitHubData(username);
  if (!data) return [];

  return data.user.organizations.nodes.map((org) => ({
    name: org.login,
    url: org.url,
    joinedYear: new Date(org.createdAt).getFullYear(),
  }));
};

export const fetchPopularRepos = async (username: string): Promise<Repo[]> => {
  const data = await fetchGitHubData(username);
  if (!data) return [];

  return data.user.repositories.nodes
    .filter((repo) => repo.owner.login === username)
    .map((repo) => ({
      name: repo.name,
      id: repo.id,
      date: new Date(repo.createdAt).getFullYear().toString(),
      html_url: repo.url,
      language: repo.primaryLanguage?.name,
      description: repo.description ?? undefined,
      homepage: repo.homepageUrl ?? undefined,
      username,
      watchers: repo.stargazerCount,
      forks: repo.forkCount,
      popularity: repo.stargazerCount + repo.forkCount,
      watchersLabel: repo.stargazerCount === 1 ? " star " : " stars ",
      forksLabel: repo.forkCount === 1 ? " fork " : " forks ",
      isOwner: true,
    }))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, configData.maxItems);
};

const sortLanguages = (
  languages: { [key: string]: number },
  username: string
): Language[] => {
  const totalUsage = Object.values(languages).reduce((acc, value) => acc + value, 0);
  return Object.entries(languages)
    .map(([name, popularity]) => ({
      name,
      popularity,
      percent: (popularity / totalUsage) * 100,
      url: `https://github.com/search?q=user%3A${username}&l=${encodeURIComponent(name)}`,
    }))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, configData.maxLanguages);
};

export const fetchLanguageData = async (username: string): Promise<Language[]> => {
  const data = await fetchGitHubData(username);
  if (!data) return [];

  const languageData: { [key: string]: number } = {};
  data.user.repositories.nodes.forEach((repo) => {
    if (repo.primaryLanguage) {
      languageData[repo.primaryLanguage.name] = (languageData[repo.primaryLanguage.name] || 0) + 1;
    }
  });

  return sortLanguages(languageData, username);
};

interface UserStats {
  followers: number;
  publicRepos: number;
  organizations: number;
  totalCommits: number;
  totalIssuesCreated: number;
  totalPRsMerged: number;
  userJoinedDate: Date;
  yearsOnGitHub: number;
  starsReceived: number;
  forks: number;
}

export const fetchUserStats = async (username: string): Promise<UserStats | null> => {
  const data = await fetchGitHubData(username);
  if (!data) return null;

  const userJoinedDate = new Date(data.user.createdAt);
  const currentYear = new Date().getFullYear();
  const yearsOnGitHub = currentYear - userJoinedDate.getFullYear();

  const starsReceived = data.user.repositories.nodes.reduce(
    (acc, repo) => acc + repo.stargazerCount,
    0
  );

  const forks = data.user.repositories.nodes.reduce(
    (acc, repo) => acc + repo.forkCount,
    0
  );

  const userStats: UserStats = {
    followers: data.user.followers.totalCount,
    publicRepos: data.user.repositories.totalCount,
    organizations: data.user.organizations.totalCount,
    totalCommits: data.user.contributionsCollection.totalCommitContributions,
    totalIssuesCreated: data.user.issues.totalCount,
    totalPRsMerged: data.user.pullRequests.totalCount,
    userJoinedDate,
    yearsOnGitHub,
    starsReceived,
    forks,
  };

  try {
    await supabase
      .from("recent_users")
      .update({
        followers: userStats.followers,
        public_repos: userStats.publicRepos,
        organizations_count: userStats.organizations,
        total_issues_created: userStats.totalIssuesCreated,
        total_prs_merged: userStats.totalPRsMerged,
        stars_recieved: userStats.starsReceived,
        forks: userStats.forks,
      })
      .eq("username", username);
  } catch (error) {
    console.error("Error updating Supabase:", error);
  }

  return userStats;
};
