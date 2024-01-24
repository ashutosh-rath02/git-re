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
export const fetchLanguageData = async (username: string) => {
  const repoResponse = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  const repos = await repoResponse.json();

  let languageData = {};
  for (let repo of repos) {
    const langResponse = await fetch(repo.languages_url);
    const langData = await langResponse.json();
    for (let [language, value] of Object.entries(langData)) {
      let languageData: { [key: string]: number } = {};

      for (let repo of repos) {
        const langResponse = await fetch(repo.languages_url);
        const langData = await langResponse.json();
        for (let [language, value] of Object.entries(langData)) {
          languageData[language] =
            (languageData[language] || 0) + Number(value);
        }
      }

      return Object.entries(languageData)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
    }
  }

  return languageData;
};
