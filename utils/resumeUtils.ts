import axios from "axios";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/consts";
import { supabaseBrowser } from "./supabase/client";

const configData = {
  maxItems: 6,
  maxLanguages: 5,
};

interface Repo {
  name: string;
  id: number;
  date: string;
  language?: string;
  description?: string;
  homepage?: string;
  username: string;
  watchers: number;
  forks: number;
  popularity: number;
  watchersLabel: string;
  forksLabel: string;
  htm_url: string;
}

interface Language {
  name: string;
  popularity: number;
  percent: number;
  url: string;
}

interface RepoContribution {
  repository: any;
  commitCount: any;
  name: string;
  contributions: number;
  url: string;
}

export interface Contribution {
  organizationName: string;
  repoUrl: string;
  repository: string;
  url: string;
  commitCount: number;
}

export interface Organization {
  name: string;
  url: string;
  joinedYear: number;
}

const sortByPopularity = (a: Repo, b: Repo) => {
  return b.popularity - a.popularity;
};

const sortLanguages = (
  languages: { [key: string]: number },
  username: string
): Language[] => {
  let totalUsage = Object.values(languages).reduce(
    (acc, value) => acc + value,
    0
  );
  return Object.entries(languages)
    .map(([name, popularity]) => ({
      name,
      popularity,
      percent: (popularity / totalUsage) * 100,
      url: `https://github.com/search?q=user%3A${username}&l=${encodeURIComponent(
        name
      )}`,
    }))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, configData.maxLanguages);
};

const getFromCache = async <T,>(key: string): Promise<T | null> => {
  const cachedData: any = await redis.get(key);
  if (cachedData) {
    console.log("LOADED FROM CACHE");
    return cachedData;
  }
  return null;
};

const supabase = supabaseBrowser();

const setInCache = async <T,>(
  key: string,
  data: T,
  expirationSeconds: number
): Promise<void> => {
  await redis.set(key, JSON.stringify(data), {
    ex: expirationSeconds,
  });
};

export const fetchOrganizations = async (
  username: string
): Promise<Organization[]> => {
  const cacheKey = `organizations:${username}`;
  const cachedOrganizations = await getFromCache<Organization[]>(cacheKey);

  if (cachedOrganizations) {
    console.log("LOADED FROM CACHE: ORGS");
    console.log(cachedOrganizations);
    return cachedOrganizations;
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/orgs`
    );
    const organizations = response.data.map((org: any) => ({
      name: org.login,
      url: org.html_url,
      joinedYear: new Date(org.created_at).getFullYear(),
    }));

    await setInCache(cacheKey, organizations, CACHE_TTL);

    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
};

export const fetchContributions = async (
  username: string
): Promise<Contribution[]> => {
  const cacheKey = `contributions:${username}`;
  const cachedContributions = await getFromCache<Contribution[]>(cacheKey);

  if (cachedContributions) {
    return cachedContributions;
  }

  try {
    const url = `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged&per_page=100`;
    const response = await axios.get(url);

    const contributionMap = new Map<
      string,
      {
        organizationName: string;
        commitsUrl: string;
        repoUrl: string;
        count: number;
      }
    >();
    response.data.items.forEach((item: any) => {
      const repoName = item.repository_url.split("/").pop();
      const repoOwner =
        item.repository_url.split("/")[
          item.repository_url.split("/").length - 2
        ];
      const organizationName = repoOwner;
      const commitsUrl = `https://github.com/${repoOwner}/${repoName}/commits?author=${username}`;
      const repoUrl = `https://github.com/${repoOwner}/${repoName}`;

      if (contributionMap.has(repoName)) {
        contributionMap.get(repoName)!.count++;
      } else {
        contributionMap.set(repoName, {
          organizationName,
          commitsUrl,
          repoUrl,
          count: 1,
        });
      }
    });

    const contributions = Array.from(
      contributionMap,
      ([repository, { organizationName, commitsUrl, repoUrl, count }]) => ({
        organizationName,
        repository,
        url: commitsUrl,
        repoUrl,
        commitCount: count,
      })
    );

    contributions.sort((a, b) => b.commitCount - a.commitCount);

    await setInCache(cacheKey, contributions, CACHE_TTL);

    return contributions;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};

export const fetchPopularRepos = async (username: string): Promise<Repo[]> => {
  const cacheKey = `popular-repos:${username}`;
  const cachedRepos = await getFromCache<Repo[]>(cacheKey);

  if (cachedRepos) {
    return cachedRepos;
  }
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const repos = response.data;

    const formattedRepos = repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        name: repo.name,
        id: repo.id,
        date: `${new Date(repo.created_at).getFullYear()}`,
        html_url: repo.html_url,
        language: repo.language,
        description: repo.description,
        homepage: repo.homepage,
        username,
        watchers: repo.stargazers_count,
        forks: repo.forks_count,
        popularity: repo.stargazers_count + repo.forks_count,
        watchersLabel: repo.stargazers_count === 1 ? " star " : " stars ",
        forksLabel: repo.forks_count === 1 ? " fork " : " forks ",
        isOwner: repo.owner.login === username,
      }))
      .sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          b.popularity - a.popularity
      )
      .slice(0, configData.maxItems);

    await setInCache(cacheKey, formattedRepos, CACHE_TTL);

    return formattedRepos;
  } catch (error) {
    console.error("Error fetching popular repos:", error);
    return [];
  }
};

export const fetchLanguageData = async (
  username: string
): Promise<Language[]> => {
  const cacheKey = `language-data:${username}`;
  const cachedLanguageData = await getFromCache<Language[]>(cacheKey);

  if (cachedLanguageData) {
    return cachedLanguageData;
  }

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = response.data;

    let languageData: { [key: string]: number } = {};
    for (const repo of repos) {
      if (repo.language) {
        languageData[repo.language] = (languageData[repo.language] || 0) + 1;
      }
    }

    const formattedLanguageData = sortLanguages(languageData, username);

    await setInCache(cacheKey, formattedLanguageData, CACHE_TTL);

    return formattedLanguageData;
  } catch (error) {
    console.error("Error fetching language data:", error);
    return [];
  }
};
export const fetchUserStats = async (username: string) => {
  const cacheKey = `user-stats:${username}`;
  const cachedUserStats = (await getFromCache(cacheKey)) as any;

  if (cachedUserStats) {
    console.log("LOADED FROM CACHE: USER STATS");
    await supabase
      .from("recent_users")
      .update({
        followers: cachedUserStats.followers,
        public_repos: cachedUserStats.publicRepos,
        organizations_count: cachedUserStats.organizations,
        total_issues_created: cachedUserStats.totalIssuesCreated,
        total_prs_merged: cachedUserStats.totalPRsMerged,
        stars_recieved: cachedUserStats.starsReceived,
        forks: cachedUserStats.forks,
      })
      .eq("username", username);

    return cachedUserStats;
  }

  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const orgsRes = await axios.get(
      `https://api.github.com/users/${username}/orgs`
    );
    const eventsRes = await axios.get(
      `https://api.github.com/users/${username}/events/public`
    );
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const starsReceived = reposRes.data.reduce(
      (acc: any, repo: { stargazers_count: any }) =>
        acc + repo.stargazers_count,
      0
    );
    const forks = reposRes.data.reduce(
      (acc: any, repo: { forks_count: any }) => acc + repo.forks_count,
      0
    );
    const userJoinedDate = new Date(userRes.data.created_at);
    const currentYear = new Date().getFullYear();
    const yearsOnGitHub = currentYear - userJoinedDate.getFullYear();

    const pushEvents = eventsRes.data.filter(
      (event: { type: string }) => event.type === "PushEvent"
    );
    const totalCommits = pushEvents.reduce(
      (acc: any, event: { payload: { commits: string | any[] } }) =>
        acc + event.payload.commits.length,
      0
    );
    const issuesRes = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+type:issue`
    );
    const totalIssuesCreated = issuesRes.data.total_count;

    const prsRes = await axios.get(
      `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`
    );
    const totalPRsMerged = prsRes.data.total_count;

    const userStats = {
      followers: userRes.data.followers,
      publicRepos: userRes.data.public_repos,
      organizations: orgsRes.data.length,
      totalCommits: totalCommits,
      totalIssuesCreated: totalIssuesCreated,
      totalPRsMerged: totalPRsMerged,
      userJoinedDate: userJoinedDate,
      yearsOnGitHub: yearsOnGitHub,
      starsReceived: starsReceived,
      forks: forks,
    };
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
    await setInCache(cacheKey, userStats, CACHE_TTL);

    return userStats;
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    return {};
  }
};
