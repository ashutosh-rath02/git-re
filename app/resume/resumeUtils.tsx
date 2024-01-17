export const fetchPopularRepos = async (username: string) => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await response.json();

  const popularRepos = repos.sort(
    (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
      b.stargazers_count - a.stargazers_count
  );

  return popularRepos.slice(0, 10);
};
