import React, { useEffect, useState } from "react";
import axios from "axios";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/consts";

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
    userJoinedDate: new Date(),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const cacheKey = `user-profile-stats:${username}`;
      const cachedUserData = await redis.get(cacheKey);

      if (cachedUserData) {
        setUserData(cachedUserData as any);
        return;
      }

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
      const userData: GitHubData = {
        followers: userRes.data.followers,
        publicRepos: userRes.data.public_repos,
        starsReceived,
        forks,
        totalCommits,
        organizations: orgsRes.data.length,
        totalIssues: issuesRes.data.total_count,
        totalPRsMerged: prsRes.data.total_count,
        userJoinedDate: new Date(userRes.data.created_at),
      };

      setUserData(userData);
      await redis.set(cacheKey, JSON.stringify(userData), { ex: CACHE_TTL });
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">GitHub Stats</h3>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Years on GitHub:</p>
            <span className="font-semibold">
              {new Date().getFullYear() -
                new Date(userData.userJoinedDate).getFullYear()}
            </span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Followers:</p>
            <span className="font-semibold">{userData.followers}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Public Repositories:</p>
            <span className="font-semibold">{userData.publicRepos}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Stars Received:</p>
            <span className="font-semibold">{userData.starsReceived}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Forks:</p>
            <span className="font-semibold">{userData.forks}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Organizations:</p>
            <span className="font-semibold">{userData.organizations}</span>
          </div>
        </div>
        {/* Uncomment if needed */}
        {/* <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Total Commits:</p>
            <span className="font-semibold">{userData.totalCommits}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Total Issues Created:</p>
            <span className="font-semibold">{userData.totalIssues}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-2">
          <div className="flex justify-between items-center">
            <p>Total PRs Merged:</p>
            <span className="font-semibold">{userData.totalPRsMerged}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default StatsBox;
