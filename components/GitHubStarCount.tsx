// components/GitHubStarCount.tsx
"use client";

import React, { useEffect, useState } from 'react';

interface GitHubStarCountProps {
  repoUrl: string;
}

const GitHubStarCount: React.FC<GitHubStarCountProps> = ({ repoUrl }) => {
  const [stars, setStars] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        // Ensure the repo URL is in the format /owner/repo
        const repoPath = repoUrl.replace('https://github.com', '');
        const response = await fetch(`https://api.github.com/repos${repoPath}`, {
            headers: {
              'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` // Replace YOUR_GITHUB_TOKEN with a GitHub Personal Access Token
            }
          });
          
        
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching star count:', error);
        setError('error');
      }
    };

    fetchStarCount();
  }, [repoUrl]);

  if (error) {
    return <span>{error}</span>;
  }

  return (
    <span>
      {stars !== null ? `${stars}` : '0'}
    </span>
  );
};

export default GitHubStarCount;
