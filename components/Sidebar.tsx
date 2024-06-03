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
  showContributionGraph: boolean;
  setShowContributionGraph: (value: boolean) => void;
  showContributions: boolean;
  setShowContributions: (value: boolean) => void;
  showOrganizations: boolean;
  setShowOrganizations: (value: boolean) => void;
  contributionCount: number;
  setContributionCount: (value: number) => void;
  organizationCount: number;
  setOrganizationCount: (value: number) => void;
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
  showContributionGraph,
  setShowContributionGraph,
  showOrganizations,
  setShowOrganizations,
  contributionCount,
  setContributionCount,
  organizationCount,
  setOrganizationCount,
}) => {
  const [startYear, setStartYearLocal] = useState<number>(
    new Date().getFullYear()
  );
  const [showOrganizationOptions, setShowOrganizationOptions] = useState(false);
  const [showContributionOptions, setShowContributionOptions] = useState(false);
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
  const toggleContributionOptions = () => {
    setShowContributionOptions(!showContributionOptions);
  };
  const toggleOrganizationOptions = () => {
    setShowOrganizationOptions(!showOrganizationOptions);
  };

  const handleRepoCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(Number(e.target.value), 1);
    setRepoCount(count);
  };

  const handleContributionCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = Math.max(Number(e.target.value), 1);
    setContributionCount(count);
  };

  const handleOrganizationCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = Math.max(Number(e.target.value), 1);
    setOrganizationCount(count);
  };

  return (
    <div className="w-64 p-4 space-y-4 lg:sticky lg:top-0">
      <p className="text-lg font-semibold">Customize Display:</p>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showName}
            onChange={() => setShowName(!showName)}
            disabled
          />
          <span>Show Name</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showBio}
            onChange={() => setShowBio(!showBio)}
            disabled
          />
          <span>Show Bio</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showBlog}
            onChange={() => setShowBlog(!showBlog)}
            disabled
          />
          <span>Show Blog</span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showRepos}
            onChange={() => setShowRepos(!showRepos)}
            disabled
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
            onChange={handleRepoCountChange}
            className="border border-gray-400 rounded p-1 w-24"
          />
        )}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showLanguageChart}
            onChange={() => setShowLanguageChart(!showLanguageChart)}
            disabled
          />
          <span>Show Language Chart</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showOtherBox}
            onChange={() => setShowOtherBox(!showOtherBox)}
            disabled
          />
          <span>Show Other Info</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showContributionGraph}
            onChange={() => setShowContributionGraph(!showContributionGraph)}
          />
          <span>Show Contribution Graph</span>
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showContributions}
            onChange={() => setShowContributions(!showContributions)}
          />
          <span className="cursor-pointer" onClick={toggleContributionOptions}>
            Show Contributions
          </span>
          <ChevronRightIcon
            style={{
              cursor: "pointer",
              transform: showContributionOptions ? "rotate(90deg)" : "none",
              transition: "transform 0.2s ease-in-out",
            }}
            height={18}
            width={18}
            onClick={toggleContributionOptions}
          />
        </div>
        {showContributionOptions && (
          <Input
            className="border border-gray-400 rounded p-1 w-24"
            type="number"
            value={contributionCount.toString()}
            onChange={ handleContributionCountChange }
          />
        )}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showOrganizations}
            onChange={() => setShowOrganizations(!showOrganizations)}
          />
          <span className="cursor-pointer" onClick={toggleOrganizationOptions}>
            Show Organizations
          </span>
          <ChevronRightIcon
            style={{
              cursor: "pointer",
              transform: showOrganizationOptions ? "rotate(90deg)" : "none",
              transition: "transform 0.2s ease-in-out",
            }}
            height={18}
            width={18}
            onClick={toggleOrganizationOptions}
          />
        </div>
        {showOrganizationOptions && (
          <Input
            type="number"
            value={organizationCount.toString()}
            onChange={handleOrganizationCountChange}
            className="border border-gray-400 rounded p-1 w-24"
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
