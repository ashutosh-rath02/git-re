"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import StatsBox from "@/components/StatsBox";
import Sidebar from "@/components/Sidebar";
import {
  fetchPopularRepos,
  fetchLanguageData,
  fetchUserStats,
} from "@/utils/resumeUtils";
import LanguageBarChart from "@/components/LanguageChart";
import ContributionGraph from "@/components/ContributionGraph";
import Contributions from "@/components/Contributions";
import Organizations from "@/components/Organizations";
import { Separator } from "@/components/ui/separator";
import AboutProduct from "@/components/AboutProduct";
import Repositories from "@/components/Repositories";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../app/globals.css";
import Link from "next/link";
import ShareBtn from "./ShareBtn";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/consts";

interface GitHubProfile {
  name: string;
  bio: string;
  blog?: string;
  login: string;
  avatar_url: string;
  repos_url: string;
  created_at: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  homepage?: string;
  watchers: number;
  forks: number;
  popularity: number;
  watchersLabel: string;
  forksLabel: string;
  isOwner: boolean;
  date: number;
}

interface Language {
  name: string;
  popularity: number;
  url: string;
  percent: number;
}

const Resume = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languageData, setLanguageData] = useState({});
  const [userStats, setUserStats] = useState({});
  const [showName, setShowName] = useState(true);
  const [showBio, setShowBio] = useState(true);
  const [showBlog, setShowBlog] = useState(true);
  const [showRepos, setShowRepos] = useState(true);
  const [showRepoOptions, setShowRepoOptions] = useState(false);
  const [repoCount, setRepoCount] = useState(3);
  const [showLanguageChart, setShowLanguageChart] = useState(true);
  const [showOtherBox, setShowOtherBox] = useState(true);
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());
  const [showContributionGraph, setShowContributionGraph] = useState(true);
  const [showContributions, setShowContributions] = useState(true);
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [contributionCount, setContributionCount] = useState(5);
  const [organizationCount, setOrganizationCount] = useState(5);
  const [loading, setLoading] = useState(true);

  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${username}_resume.pdf`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if profile data is cached
        const cachedProfileData = await redis.get(`profile:${username}`);
        if (cachedProfileData) {
          setProfile(cachedProfileData as any);
        } else {
          // Fetch profile data and cache it
          const profileData = await fetch(
            `https://api.github.com/users/${username}`
          ).then((res) => res.json());
          setProfile(profileData);
          await redis.set(`profile:${username}`, JSON.stringify(profileData), {
            ex: CACHE_TTL,
          });
        }

        const reposData = await fetchPopularRepos(username);
        setRepos(reposData as unknown as GitHubRepo[]);

        const languages = await fetchLanguageData(username);
        setLanguageData(languages);

        const stats = await fetchUserStats(username);
        setUserStats(stats);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username, startYear, endYear, organizationCount]);

  const handleRepoCountChange = (value: number) => {
    setRepoCount(value);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="loader-container flex items-center justify-center">
          <div className="ball ball1"></div>
          <div className="ball ball2"></div>
          <div className="ball ball3"></div>
        </div>
        <p>We are fetching your data...</p>
      </div>
    );
  }

  if (!profile) {
    return <div>Error fetching data...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row w-full bg-background text-foreground">
      <div className="lg:w-64 border-r border-gray-300 p-4 space-y-4 order-2 lg:order-1">
        <Sidebar
          showName={showName}
          setShowName={setShowName}
          showBio={showBio}
          setShowBio={setShowBio}
          showBlog={showBlog}
          setShowBlog={setShowBlog}
          showRepos={showRepos}
          setShowRepos={setShowRepos}
          showRepoOptions={showRepoOptions}
          setShowRepoOptions={setShowRepoOptions}
          repoCount={repoCount}
          setRepoCount={handleRepoCountChange}
          showLanguageChart={showLanguageChart}
          setShowLanguageChart={setShowLanguageChart}
          showOtherBox={showOtherBox}
          setShowOtherBox={setShowOtherBox}
          setStartYear={setStartYear}
          setEndYear={setEndYear}
          showContributions={showContributions}
          setShowContributions={setShowContributions}
          showContributionGraph={showContributionGraph}
          setShowContributionGraph={setShowContributionGraph}
          showOrganizations={showOrganizations}
          setShowOrganizations={setShowOrganizations}
          contributionCount={contributionCount}
          setContributionCount={setContributionCount}
          organizationCount={organizationCount}
          setOrganizationCount={setOrganizationCount}
        />
      </div>

      <div className="flex-grow p-4 order-1 lg:order-2">
        <div ref={resumeRef} className="mx-auto flex justify-center">
          <div className="bg-[#020817] h-full w-full rounded-md bg-clip-padding dark:backdrop-filter dark:backdrop-blur-md dark:bg-opacity-10 border border-gray-100 shadow-md p-6 max-w-4xl">
            <ShareBtn username={username} />
            <div className="flex flex-col items-center">
              <Image
                src={profile.avatar_url || ""}
                alt="Profile"
                className="rounded-full mb-4"
                width={124}
                height={124}
              />
              {showName && (
                <h1 className="text-3xl font-bold text-center text-[#F8FAFC]">
                  {profile.name || profile.login}
                </h1>
              )}
              {showBio && (
                <p className="text-center text-[#F8FAFC]">{profile.bio}</p>
              )}
              {showBlog && profile.blog && (
                <Link
                  href={
                    profile.blog.includes("http")
                      ? profile.blog
                      : `https://${profile.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {profile.blog}
                </Link>
              )}
            </div>

            <div className="flex flex-col lg:flex-row w-full mt-6 gap-2 text-[#F8FAFC]">
              {showLanguageChart && (
                <div className="flex-1 w-full lg:w-1/2 h-full">
                  <LanguageBarChart languages={languageData as Language[]} />
                </div>
              )}
              {showOtherBox && (
                <div className="flex-1 h-full">
                  <StatsBox username={username} />
                </div>
              )}
            </div>
            <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />

            {showRepos && <Repositories repos={repos} repoCount={repoCount} />}
            {showContributionGraph && (
              <>
                <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                <ContributionGraph username={username} />
              </>
            )}
            {showContributions && (
              <>
                <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                <Contributions
                  username={username}
                  contributionCount={contributionCount}
                />
              </>
            )}
            {showOrganizations && (
              <>
                <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                <Organizations username={username} count={organizationCount} />
              </>
            )}
            <Separator className="my-6 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            <AboutProduct username={username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
