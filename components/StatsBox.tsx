import React, { useEffect, useState } from "react";
import axios from "axios";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/consts";
import { fetchUserStats } from "@/utils/resumeUtils";

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
      await fetchUserStats(username).then((data) => {
        setUserData(data);
      });
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
