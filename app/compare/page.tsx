"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getIndividualUserRank, getLeaderboard } from '../leaderboard/action';
import { calculateRating } from '@/utils/rating/action';
import Image from 'next/image';
import Link from 'next/link';
import { badgeVariants } from '@/components/ui/badge';
import { getRankSuffix } from '@/utils/format';
import { fetchUserStats } from '@/utils/resumeUtils';
import { useTheme } from 'next-themes';
import RadarChart from '@/components/RadarChart';


interface UserData {
  yearsOnGitHub: number;
  totalIssuesCreated: number;
  avatar_url: string;
  name: string;
  bio: string;
  rating: number;
  rank: number;
  publicRepos: number;
  followers: number;
  login: string;
  starsReceived: number;
  forks: number;
  totalCommits: number;
  organizations: number;
  totalIssues: number;
  totalPRsMerged: number;
  userJoinedDate: Date;
}

const Compare = () => {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [userData1, setUserData1] = useState<UserData | null>(null);
  const [userData2, setUserData2] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [allSuggestions, setAllSuggestions] = useState<string[]>([]);
  const [filteredSuggestions1, setFilteredSuggestions1] = useState<string[]>([]);
  const [filteredSuggestions2, setFilteredSuggestions2] = useState<string[]>([]);
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const suggestionRef1 = useRef<HTMLDivElement>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const [error, setError] = useState<string | null>(null);


  const suggestionRef2 = useRef<HTMLDivElement>(null);

  const fetchAllLeaderboardData = async () => {
    let page = 1;
    let allData: string[] = [];
    let hasMorePages = true;

    while (hasMorePages) {
      try {
        const { data } = await getLeaderboard({ page });
        if (data.length > 0) {
          allData = [...allData, ...data.map(user => user.username)];
          page++;
        } else {
          hasMorePages = false;
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        hasMorePages = false;
      }
    }

    return allData;
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const allUsernames = await fetchAllLeaderboardData();
        setAllSuggestions(allUsernames);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchSuggestions();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef1.current && !suggestionRef1.current.contains(event.target as Node)) {
        setShowSuggestions1(false);
      }
      if (suggestionRef2.current && !suggestionRef2.current.contains(event.target as Node)) {
        setShowSuggestions2(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchUserData = async (username: string): Promise<UserData> => {
    const profile = await fetch(`https://api.github.com/users/${username}`).then(res => res.json());
    const rating = await calculateRating(username);
    const [rank] = await getIndividualUserRank(username);
    const stats = await fetchUserStats(username);

    return { ...profile, ...stats, rating, rank: rank.user_rank, userJoinedDate : stats? new Date(stats.userJoinedDate): null};
  };

  const handleCompare = async () => {
    if (!username1 || !username2) {
      setError('Both fields are required.');
      return;
    }
    if (username1 === username2) {
      setError('Cannot compare the same usernames.');
      return;
    }

    setLoading(true);
    setError(null);  // Clear previous errors

    try {
      const data1 = await fetchUserData(username1);
      const data2 = await fetchUserData(username2);
      setUserData1(data1);
      setUserData2(data2);
    } catch (error) {
      setError('Either the username(s) does not exist in the leaderboard or is/are invalid.');
      console.error('Error fetching user data:', error);
    }

    setLoading(false);
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    filterSetter: React.Dispatch<React.SetStateAction<string[]>>,
    showSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setter(value);
    if (value.length > 0) {
      filterSetter(allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5));
      showSetter(true);
    } else {
      filterSetter([]);
      showSetter(false);
    }
  };

  const handleSuggestionClick = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    showSetter: React.Dispatch<React.SetStateAction<boolean>>,
    value: string
  ) => () => {
    setter(value);
    showSetter(false);
  };

  const ComparisonTable = ({ userData1, userData2 }: { userData1: UserData; userData2: UserData }) => {
    const compareStats = (stat1: number, stat2: number, key: string) => {
      if (key === 'name') return '';
      if (stat1 > stat2) return 'bg-green-200 dark:bg-green-800';
      if (stat1 < stat2) return 'bg-red-200 dark:bg-red-500';
      return 'bg-gray-100 dark:bg-gray-400';
    };

    const stats = [
      { label: 'Name', key: 'name' },
      { label: 'Rating', key: 'rating' },
      { label: 'Public Repos', key: 'publicRepos' },
      { label: 'Followers', key: 'followers' },
      { label: 'Total Commits', key: 'totalCommits' },
      { label: 'Total Issues Created', key: 'totalIssuesCreated' },
      { label: 'Total PRs Merged', key: 'totalPRsMerged' },
      { label: 'Stars Received', key: 'starsReceived' },
      { label: 'Forks', key: 'forks' },
      { label: 'Years on GitHub', key: 'yearsOnGitHub' },
    ];

    return (
      <div className="w-full overflow-x-auto" style={{ boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)' }}>
        <table className="w-full border-collapse">
          <tbody>
            {stats.map(({ label, key }) => (
              <tr key={key} className="border-b dark:border-gray-700">
                <td className="p-2 font-medium">{label}</td>
                <td className={`p-2 text-center ${compareStats(userData1[key as keyof UserData] as number, userData2[key as keyof UserData] as number, key)}`}>
                  {key === 'name' ? (userData1[key] || userData1.login) : key === 'rating' ? userData1[key as keyof UserData].toFixed(2) : userData1[key as keyof UserData].toString()}
                </td>
                <td className={`p-2 text-center ${compareStats(userData2[key as keyof UserData] as number, userData1[key as keyof UserData] as number, key)}`}>
                  {key === 'name' ? (userData2[key] || userData2.login) : key === 'rating' ? userData2[key as keyof UserData].toFixed(2) : userData2[key as keyof UserData].toString()}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  };


  const UserCard = ({ userData, isWinner }: { userData: UserData; isWinner: boolean }) => {
    const formattedJoinedDate = isNaN(userData.userJoinedDate.getTime())
      ? 'Unknown'
      : userData.userJoinedDate.toDateString();

    return (
      <div className={`border p-4 rounded-lg ${isWinner ? 'bg-green-100 dark:bg-green-800' : ''} border-gray-300 dark:border-gray-700`} style={{
        boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)'
      }}>
        <Image src={userData.avatar_url} alt={userData.name} width={100} height={100} className="rounded-full mb-4" />
        <h2 className="text-xl font-bold">{userData.name || userData.login}</h2>
        <p className="text-gray-600 dark:text-gray-300">{userData.bio}</p>
        <div className="mt-2">
          <Link
            className={badgeVariants({ variant: "outline" })}
            href="/FAQs/rating.md"
          >
            {userData.rating.toFixed(2)} / 5
          </Link>
          <Link
            className={badgeVariants({ variant: "outline" })}
            href="/leaderboard"
          >
            {userData.rank}{getRankSuffix(userData.rank)} on Leaderboard
          </Link>
        </div>
        <p>Joined GitHub: {formattedJoinedDate}</p>
      </div>
    );
  };

  const ComparisonBarChart = ({ userData1, userData2 }: { userData1: UserData; userData2: UserData }) => {
    const stats = [
      { label: 'Public Repos', key: 'publicRepos' },
      { label: 'Followers', key: 'followers' },
      { label: 'Total Commits', key: 'totalCommits' },
      { label: 'Total Issues Created', key: 'totalIssuesCreated' },
      { label: 'Total PRs Merged', key: 'totalPRsMerged' },
      { label: 'Stars Received', key: 'starsReceived' },
      { label: 'Forks', key: 'forks' },
      { label: 'Years on GitHub', key: 'yearsOnGitHub' },
    ];

    const maxValues = stats.reduce((acc, { key }) => {
      acc[key as keyof UserData] = Math.max(userData1[key as keyof UserData], userData2[key as keyof UserData]);
      return acc;
    }, {} as Record<keyof UserData, number>);

    const renderBar = (userData: UserData, key: string, maxValue: number) => (
      <div className="flex items-center space-x-2 w-full">
        <span className="text-sm font-medium w-24 truncate">{userData.name || userData.login}</span>
        <div className="flex-grow h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          {maxValue > 0 ? (
            <div
              className={`h-full ${userData === userData1 ? 'bg-blue-500' : 'bg-green-500'}`}
              style={{ width: `${(userData[key] / maxValue) * 100}%` }}
            />
          ) : (
            <div className="h-full w-0" /> // Empty bar when both values are zero
          )}
        </div>
        <span className="text-sm w-16 text-right">{userData[key]}</span>
      </div>
    );

    return (
      <div className="w-full space-y-8 mt-8">
        <h2 className="text-xl font-semibold mb-4">Comparison Charts (Relative Comparison)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stats.map(({ label, key }, index) => (
            index % 2 === 0 && (
              <div
                key={key}
                className="space-y-4 border rounded-2xl p-4"
                style={{
                  boxShadow: '0 0 15px rgba(52, 211, 153, 0.5)'
                }}
              >
                <div>
                  <div className="text-2xl max-md:text-lg font-medium mb-2">{label}</div>
                  {renderBar(userData1, key, maxValues[key])}
                  <div className='h-2'></div>
                  {renderBar(userData2, key, maxValues[key])}
                </div>
                {stats[index + 1] && (
                  <div>
                    <div className="text-2xl max-md:text-lg font-medium mb-2">{stats[index + 1].label}</div>
                    {renderBar(userData1, stats[index + 1].key, maxValues[stats[index + 1].key])}
                    <div className='h-2'></div>
                    {renderBar(userData2, stats[index + 1].key, maxValues[stats[index + 1].key])}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-2 lg:px-4 max-md:rounded-none rounded-2xl bg-white dark:bg-inherit text-black dark:text-white">
      <h1 className="text-2xl font-semibold mb-6 mt-4">Compare GitHub Users</h1>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="Enter first GitHub username"
            className="h-12 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            value={username1}
            onChange={handleInputChange(setUsername1, setFilteredSuggestions1, setShowSuggestions1)}
          />
          {showSuggestions1 && (
            <div ref={suggestionRef1} className="absolute z-10 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border mt-1 rounded-md shadow-lg">
              {filteredSuggestions1.length > 0 ? (
                filteredSuggestions1.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={handleSuggestionClick(setUsername1, setShowSuggestions1, suggestion)}
                  >
                    {suggestion}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2">No suggestions found</div>
              )}
            </div>
          )}
        </div>
        <div className="flex-grow relative">
          <Input
            type="text"
            placeholder="Enter second GitHub username"
            className="h-12 w-full bg-white dark:bg-gray-800 text-black dark:text-white"
            value={username2}
            onChange={handleInputChange(setUsername2, setFilteredSuggestions2, setShowSuggestions2)}
          />
          {showSuggestions2 && (
            <div ref={suggestionRef2} className="absolute z-10 w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 border mt-1 rounded-md shadow-lg">
              {filteredSuggestions2.length > 0 ? (
                filteredSuggestions2.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={handleSuggestionClick(setUsername2, setShowSuggestions2, suggestion)}
                  >
                    {suggestion}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2">No suggestions found</div>
              )}
            </div>
          )}
        </div>
        <Button
          className="h-12 px-6 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white"
          onClick={handleCompare}
          disabled={loading}
        >
          {loading ? 'Comparing...' : 'Compare'}
        </Button>
      </div>

      {error && (
        <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}


      {userData1 && userData2 && (
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <UserCard userData={userData1} isWinner={userData1.rank < userData2.rank} />
            <UserCard userData={userData2} isWinner={userData2.rank < userData1.rank} />
          </div>
          <ComparisonTable userData1={userData1} userData2={userData2} />
          <ComparisonBarChart userData1={userData1} userData2={userData2} />
          <RadarChart data1={userData1} data2={userData2} />
        </div>
      )}
    </div>
  );
};

export default Compare;