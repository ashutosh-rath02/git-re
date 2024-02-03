import axios from "axios";

const configData = {
  maxItems: 5,
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

export const fetchOrganizations = async (
  username: string
): Promise<Organization[]> => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/orgs`
    );
    const organizations = response.data.map((org: any) => ({
      name: org.login,
      url: org.html_url,
      joinedYear: new Date(org.created_at).getFullYear(),
    }));
    return organizations;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    return [];
  }
};

export const fetchContributions = async (
  username: string
): Promise<Contribution[]> => {
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
    return contributions;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};

export const fetchPopularRepos = async (username: string): Promise<Repo[]> => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const repos = response.data;

    return repos
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
  } catch (error) {
    console.error("Error fetching popular repos:", error);
    return [];
  }
};
export const fetchLanguageData = async (
  username: string
): Promise<Language[]> => {
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

    return sortLanguages(languageData, username);
  } catch (error) {
    console.error("Error fetching language data:", error);
    return [];
  }
};

export const fetchUserStats = async (username: string) => {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const orgsRes = await axios.get(
      `https://api.github.com/users/${username}/orgs`
    );
    const eventsRes = await axios.get(
      `https://api.github.com/users/${username}/events/public`
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

    return {
      followers: userRes.data.followers,
      publicRepos: userRes.data.public_repos,
      organizations: orgsRes.data.length,
      totalCommits: totalCommits,
      totalIssuesCreated: totalIssuesCreated,
      totalPRsMerged: totalPRsMerged,
      userJoinedDate: userJoinedDate,
      yearsOnGitHub: yearsOnGitHub,
    };
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    return {};
  }
};
