export interface RepoLanguageStats {
  [language: string]: number;
}

export interface LanguageDetail {
  name: string;
  bytes: number;
}

export interface Language {
  name: string;
  percent: number;
  url: string;
}
