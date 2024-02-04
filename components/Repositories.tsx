import React from "react";

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  language: string;
  homepage?: string;
  watchers: number;
  forks: number;
  watchersLabel: string;
  forksLabel: string;
  date: number;
}

interface RepositoriesProps {
  repos: GitHubRepo[];
  repoCount: number;
}

const Repositories: React.FC<RepositoriesProps> = ({ repos, repoCount }) => {
  return (
    <div className="mt-5 px-2">
      <h2 className="text-2xl mb-4 font-bold underline text-left text-white">
        Popular Repositories
      </h2>
      <ul className="list-disc px-4">
        {repos.slice(0, repoCount).map((repo) => (
          <li key={repo.id} className="mt-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-500 underline"
                >
                  {repo.name}
                </a>
                <span className="text-sm text-white ">({repo.date})</span>
              </div>
              {repo.homepage && (
                <>
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline pb-1"
                  >
                    {repo.homepage}
                  </a>
                </>
              )}
              <p className="text-gray-200">
                <span className="font-semibold">{repo.language}</span>
                &nbsp;-&nbsp;
                {"Owner"}
              </p>
              <p className="text-gray-400 text-sm">
                This repository has&nbsp;
                <span className="font-semibold">{repo.watchers}</span>
                {repo.watchersLabel} and&nbsp;
                <span className="font-semibold">{repo.forks}</span>
                {repo.forksLabel}. If you would like more information about this
                repository and my contributed code, please visit the
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline ml-1"
                >
                  repository&nbsp;
                </a>
                on GitHub.
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repositories;
