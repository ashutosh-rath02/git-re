import React, { useEffect, useState } from "react";
import { fetchContributions } from "@/utils/resumeUtils";
import { Contribution } from "@/utils/resumeUtils";

interface ContributionsProps {
  username: string;
}

const Contributions: React.FC<ContributionsProps> = ({ username }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const count = 5;

  useEffect(() => {
    const fetchAndSetContributions = async () => {
      try {
        const contributionsData = await fetchContributions(username);
        setContributions(
          contributionsData.slice(0, count).map((contribution) => ({
            repository: contribution.repository,
            url: contribution.url,
            repoUrl: contribution.repoUrl,
            commitCount: contribution.commitCount,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      }
    };

    fetchAndSetContributions();
  }, [username, count]);

  return (
    <div className="mt-5">
      <h2 className="text-2xl mb-4 text-left text-white">Contributions</h2>
      <ul className="list-disc px-4">
        {contributions.map((contribution, index) => (
          <li key={index} className="mt-4">
            <a
              href={contribution.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-500 hover:underline cursor-pointer underline"
            >
              {contribution.repository}
            </a>
            <p className="text-gray-400">
              has contributed to <strong>{contribution.repository}</strong>{" "}
              with&nbsp;
              <a
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-500 hover:underline"
              >
                {contribution.commitCount} commit(s)
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contributions;
