// ResumeUtils.tsx
import axios from "axios";

export const fetchPopularRepos = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await response.json();

  // Sorting repositories based on stargazers count
  const popularRepos = repos.sort(
    (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
      b.stargazers_count - a.stargazers_count
  );

  return popularRepos.slice(0, 10);
};

export const fetchLanguageData = async (username: string) => {
  const repoResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await repoResponse.json();

  let languageData: { [key: string]: number } = {};

  for (let repo of repos) {
    const langResponse = await fetch(repo.languages_url);
    const langData = await langResponse.json();

    for (let [language, value] of Object.entries(langData)) {
      languageData[language] = (languageData[language] || 0) + Number(value);
    }
  }

  return Object.entries(languageData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};
export const fetchUserStats = async (username: string) => {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const reposRes = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const orgsRes = await axios.get(
      `https://api.github.com/users/${username}/orgs`
    );
    const eventsRes = await axios.get(
      `https://api.github.com/users/${username}/events/public`
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

    // Calculate contribution streak - this is a simple example and may not be fully accurate
    const today = new Date();
    const contributions = eventsRes.data.filter(
      (event: { type: string }) => event.type === "PushEvent"
    );
    let streak = contributions.reduce(
      (
        acc: number,
        contribution: { created_at: string | number | Date },
        index: number,
        array: { created_at: string | number | Date }[]
      ) => {
        const currentStreak = Math.abs(
          new Date(contribution.created_at).getTime() - today.getTime()
        );
        if (index === 0) return currentStreak;

        const previousStreak = Math.abs(
          new Date(array[index - 1].created_at).getTime() - today.getTime()
        );
        return currentStreak === 1 && previousStreak === currentStreak + 1
          ? acc + 1
          : acc;
      },
      0
    );

    return {
      followers: userRes.data.followers,
      publicRepos: userRes.data.public_repos,
      starsReceived,
      forks,
      contributionStreak: streak,
      organizations: orgsRes.data.length,
      // Issues and Pull Requests require additional specific API calls and are not covered here
    };
  } catch (error) {
    console.error("Error fetching user statistics:", error);
    return {}; // Return an empty object in case of error
  }
};
