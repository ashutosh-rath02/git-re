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
      <h3 className="text-lg font-semibold mb-4 text-center">GitHub Stats</h3>
      <p>
        <strong>Years on GitHub:</strong>{" "}
        {new Date().getFullYear() - userData.userJoinedDate.getFullYear()}
      </p>
      <p>
        <strong>Followers:</strong> {userData.followers}
      </p>
      <p>
        <strong>Public Repositories:</strong> {userData.publicRepos}
      </p>
      <p>
        <strong>Stars Received:</strong> {userData.starsReceived}
      </p>
      <p>
        <strong>Forks:</strong> {userData.forks}
      </p>
      {/* <p>
        <strong>Total Commits:</strong> {userData.totalCommits}
      </p> */}
      <p>
        <strong>Organizations:</strong> {userData.organizations}
      </p>
      {/* <p>
        <strong>Total Issues Created:</strong> {userData.totalIssues}
      </p>
      <p>
        <strong>Total PRs Merged:</strong> {userData.totalPRsMerged}
      </p> */}
    </div>
  );
};

export default StatsBox;
