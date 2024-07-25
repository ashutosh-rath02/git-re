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

export interface UserData {
  name: string;
  avatar_url: string;
  bio: string;
  username: string;
}

export type UsageData = {
  user_id: string;
  date: string;
  usage_count: number;
};
