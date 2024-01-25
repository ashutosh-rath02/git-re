import React, { useEffect, useState } from "react";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";

interface GitHubData {
  followers: number;
  publicRepos: number;
  starsReceived: number;
  forks: number;
  contributionStreak: number;
  organizations: number;
  totalIssues: number;
  totalPRsMerged: number;
}

const StatsBox = ({ username }: { username: string }) => {
  const [userData, setUserData] = useState<GitHubData>({
    followers: 0,
    publicRepos: 0,
    starsReceived: 0,
    forks: 0,
    contributionStreak: 0,
    organizations: 0,
    totalIssues: 0,
    totalPRsMerged: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposRes = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=100`
      );
      const orgsRes = await axios.get(
        `https://api.github.com/users/${username}/orgs`
      );
      const eventsRes = await axios.get(
        `https://api.github.com/users/${username}/events/public`
      );
      const issuesRes = await axios.get(
        `https://api.github.com/search/issues?q=author:${username}+type:issue`
      );
      const prsRes = await axios.get(
        `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`
      );

      const starsReceived = reposRes.data.reduce(
        (acc: number, repo: { stargazers_count: number }) =>
          acc + repo.stargazers_count,
        0
      );
      const forks = reposRes.data.reduce(
        (acc: number, repo: { forks_count: number }) => acc + repo.forks_count,
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
          contribution: { created_at: string },
          index: number,
          array: { created_at: string }[]
        ) => {
          const currentStreak = differenceInCalendarDays(
            today,
            new Date(contribution.created_at)
          );
          if (index === 0) return currentStreak;

          const previousStreak = differenceInCalendarDays(
            today,
            new Date(array[index - 1].created_at)
          );
          return currentStreak === 1 && previousStreak === currentStreak + 1
            ? acc + 1
            : acc;
        },
        0
      );

      setUserData({
        followers: userRes.data.followers,
        publicRepos: userRes.data.public_repos,
        starsReceived,
        forks,
        contributionStreak: streak,
        organizations: orgsRes.data.length,
        totalIssues: issuesRes.data.total_count,
        totalPRsMerged: prsRes.data.total_count,
      });
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="box border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-center">GitHub Stats</h3>
      <p>
        <span className="text-blue-600">
          <strong>Stars Received:</strong>
        </span>{" "}
        <span className="text-white">{userData.starsReceived}</span>
      </p>
      <p>
        <span className="text-blue-600">
          <strong>Forks:</strong>
        </span>{" "}
        <span className="text-white">{userData.forks}</span>
      </p>
      <p>
        <span className="text-blue-600">
          <strong>Contribution Streak (days):</strong>
        </span>{" "}
        <span className="text-white">{userData.contributionStreak}</span>
      </p>
      <p>
        <span className="text-blue-600">
          <strong>Organizations:</strong>
        </span>{" "}
        <span className="text-white">{userData.organizations}</span>
      </p>
      <p>
        <span className="text-blue-600">
          <strong>Total Issues Created:</strong>
        </span>{" "}
        <span className="text-white">{userData.totalIssues}</span>
      </p>
      <p>
        <span className="text-blue-600">
          <strong>Total PRs Merged:</strong>
        </span>{" "}
        <span className="text-white">{userData.totalPRsMerged}</span>
      </p>
      {/* Other stats would be displayed here once their respective data is fetched */}
      {/* Other stats would be displayed here once their respective data is fetched */}
    </div>
  );
};

export default StatsBox;
