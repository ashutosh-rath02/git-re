// Sidebar.tsx
import React, { useState } from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Select } from "./ui/select";

interface SidebarProps {
  showName: boolean;
  setShowName: (value: boolean) => void;
  showBio: boolean;
  setShowBio: (value: boolean) => void;
  showBlog: boolean;
  setShowBlog: (value: boolean) => void;
  showRepos: boolean;
  setShowRepos: (value: boolean) => void;
  showRepoOptions: boolean;
  setShowRepoOptions: (value: boolean) => void;
  repoCount: number;
  setRepoCount: (value: number) => void;
  showLanguageChart: boolean;
  setShowLanguageChart: (value: boolean) => void;
  showOtherBox: boolean;
  setShowOtherBox: (value: boolean) => void;
  setStartYear: (value: number) => void;
  setEndYear: (value: number) => void;
  showContributions: boolean;
  setShowContributions: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  showName,
  setShowName,
  showBio,
  setShowBio,
  showBlog,
  setShowBlog,
  showRepos,
  setShowRepos,
  showRepoOptions,
  setShowRepoOptions,
  repoCount,
  setRepoCount,
  showLanguageChart,
  setShowLanguageChart,
  showOtherBox,
  setShowOtherBox,
  setStartYear,
  setEndYear,
  showContributions,
  setShowContributions,
}) => {
  const [startYear, setStartYearLocal] = useState<number>(
    new Date().getFullYear()
  );
  const [endYear, setEndYearLocal] = useState<number>(new Date().getFullYear());
  const toggleRepoOptions = () => {
    setShowRepoOptions(!showRepoOptions);
  };
  const handleStartYearChange = (value: string) => {
    const year = Number(value);
    setStartYearLocal(year);
    setStartYear(year);
  };

  const handleEndYearChange = (value: string) => {
    const year = Number(value);
    setEndYearLocal(year);
    setEndYear(year);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => {
    const year = currentYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="w-64 border-r border-gray-300 p-4 space-y-4">
      <p className="text-lg font-semibold">Customize Display:</p>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showName}
            onChange={() => setShowName(!showName)}
          />
          <span>Show Name</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showBio}
            onChange={() => setShowBio(!showBio)}
          />
          <span>Show Bio</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showBlog}
            onChange={() => setShowBlog(!showBlog)}
          />
          <span>Show Blog</span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showRepos}
            onChange={() => setShowRepos(!showRepos)}
          />
          <span className="cursor-pointer" onClick={toggleRepoOptions}>
            Show Repositories
          </span>
          <ChevronRightIcon
            style={{
              cursor: "pointer",
              transform: showRepoOptions ? "rotate(90deg)" : "none",
              transition: "transform 0.2s ease-in-out",
            }}
            height={18}
            width={18}
            onClick={toggleRepoOptions}
          />
        </div>
        {showRepoOptions && (
          <Input
            type="number"
            value={repoCount.toString()}
            onChange={(e) => setRepoCount(Number(e.target.value))}
            className="border border-gray-400 rounded p-1 w-24"
          />
        )}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showLanguageChart}
            onChange={() => setShowLanguageChart(!showLanguageChart)}
          />
          <span>Show Language Chart</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showOtherBox}
            onChange={() => setShowOtherBox(!showOtherBox)}
          />
          <span>Show Other Info</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showContributions}
            onChange={() => setShowContributions(!showContributions)}
          />
          <span>Show Contributions</span>
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
