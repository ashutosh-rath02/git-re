import axios from "axios";
import { RepoLanguageStats, LanguageDetail, Language } from "../types";

export const fetchUserContributionLanguages = async (
  username: string
): Promise<Language[]> => {
  try {
    const repoResponse = await axios.get(
      `https://api.github.com/search/repositories?q=user:${username}+fork:true`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
        },
      }
    );
    const repos = repoResponse.data.items;

    let languageStats: RepoLanguageStats = {};

    for (const repo of repos) {
      const languagesResponse = await axios.get(repo.languages_url);
      const languages: RepoLanguageStats = languagesResponse.data;

      for (const [language, bytes] of Object.entries(languages)) {
        languageStats[language] = (languageStats[language] || 0) + bytes;
      }
    }

    const totalBytes = Object.values(languageStats).reduce(
      (sum, bytes) => sum + bytes,
      0
    );
    return Object.entries(languageStats)
      .sort((a, b) => b[1] - a[1])
      .map(
        ([name, bytes]): Language => ({
          name,
          percent: (bytes / totalBytes) * 100,
          url: `https://github.com/search?q=user%3A${username}+language%3A${encodeURIComponent(
            name
          )}`,
        })
      );
  } catch (error) {
    console.error("Error fetching user contribution languages:", error);
    return [];
  }
};
