import React, { useEffect, useState } from "react";
import axios from "axios";

interface GitHubData {
  followers: number;
  publicRepos: number;
  starsReceived: number;
  forks: number;
  totalCommits: number;
  organizations: number;
  totalIssues: number;
  totalPRsMerged: number;
  // yearsOnGitHub: number;
  userJoinedDate: Date;
}

const StatsBox = ({ username }: { username: string }) => {
  const [userData, setUserData] = useState<GitHubData>({
    followers: 0,
    publicRepos: 0,
    starsReceived: 0,
    forks: 0,
    totalCommits: 0,
    organizations: 0,
    totalIssues: 0,
    totalPRsMerged: 0,
    // yearsOnGitHub: 0,
    userJoinedDate: new Date(),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetching basic user data
      const userRes = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const orgsRes = await axios.get(
        `https://api.github.com/users/${username}/orgs`
      );

      // Fetching stars and forks
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

      // Fetching total commits (approximation using PushEvents)
      const eventsRes = await axios.get(
        `https://api.github.com/users/${username}/events/public`
      );
      const totalCommits = eventsRes.data
        .filter((event: { type: string }) => event.type === "PushEvent")
        .reduce(
          (acc: any, event: { payload: { commits: string | any[] } }) =>
            acc + event.payload.commits.length,
          0
        );

      // Fetching total issues created and PRs merged
      const issuesRes = await axios.get(
        `https://api.github.com/search/issues?q=author:${username}+type:issue`
      );
      const prsRes = await axios.get(
        `https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`
      );

      // Setting the data
      setUserData({
        followers: userRes.data.followers,
        publicRepos: userRes.data.public_repos,
        starsReceived,
        forks,
        totalCommits,
        organizations: orgsRes.data.length,
        totalIssues: issuesRes.data.total_count,
        totalPRsMerged: prsRes.data.total_count,
        // yearsOnGitHub: userData.yearsOnGitHub,
        userJoinedDate: new Date(userRes.data.created_at),
      });
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="box border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4 text-start">GitHub Stats</h3>
      <p className="flex flex-row justify-stretch">
        <p>Years on GitHub:</p>{" "}
        <span>
          {new Date().getFullYear() - userData.userJoinedDate.getFullYear()}
        </span>
      </p>
      <p className="flex flex-row justify-stretch space-x-2">
        <p>Followers:</p> <span>{userData.followers}</span>
      </p>
      <p className="flex flex-row justify-stretch">
        <p>Public Repositories:</p> <span>{userData.publicRepos}</span>
      </p>
      <p className="flex flex-row justify-stretch">
        <p>Stars Received:</p> <span>{userData.starsReceived}</span>
      </p>
      <p className="flex flex-row justify-stretch">
        <p>Forks:</p> <span>{userData.forks}</span>
      </p>
      {/* <p>
        <p>Total Commits:</p> {userData.totalCommits}
      </p> */}
      <p className="flex flex-row justify-stretch">
        <p>Organizations:</p> <span>{userData.organizations}</span>
      </p>
      {/* <p>
        <p>Total Issues Created:</p> {userData.totalIssues}
      </p>
      <p>
        <p>Total PRs Merged:</p> {userData.totalPRsMerged}
      </p> */}
    </div>
  );
};

export default StatsBox;
