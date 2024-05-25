"use server";
import { supabaseServer } from "../supabase/server";

interface UserStats {
  stars_recieved: number;
  followers: number;
  public_repos: number;
  organizations_count: number;
  total_prs_merged: number;
  total_issues_created: number;
}

const getPointsForStars = (stars: number): number => {
  if (stars > 500) return 5;
  if (stars > 200) return 4;
  if (stars > 50) return 3;
  if (stars > 10) return 2;
  return 1;
};

const getPointsForRepos = (repos: number): number => {
  if (repos > 101) return 5;
  if (repos > 51) return 4;
  if (repos > 21) return 3;
  if (repos > 6) return 2;
  return 1;
};

const getPointsForFollowers = (followers: number): number => {
  if (followers > 501) return 5;
  if (followers > 101) return 4;
  if (followers > 51) return 3;
  if (followers > 11) return 2;
  return 1;
};

const getPointsForOrganizations = (orgs: number): number => {
  if (orgs > 6) return 5;
  if (orgs > 4) return 4;
  if (orgs > 2) return 3;
  if (orgs > 1) return 2;
  return 1;
};

const getPointsForContributions = (prs: number, issues: number): number => {
  const contributions = prs + issues;
  if (contributions > 51) return 5;
  if (contributions > 21) return 4;
  if (contributions > 6) return 3;
  if (contributions > 1) return 2;
  return 1;
};

export const calculateRating = async (username: string): Promise<number> => {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("recent_users")
      .select(
        "stars_recieved, followers, public_repos, organizations_count, total_prs_merged, total_issues_created"
      )
      .eq("username", username)
      .single();

    if (error) {
      console.log("Error fetching user stats", error);
      throw error;
    }

    if (!data) {
      console.log("User not found");
      return 0;
    }

    const {
      stars_recieved,
      followers,
      public_repos,
      organizations_count,
      total_prs_merged,
      total_issues_created,
    }: UserStats = data;

    const pointsStars = getPointsForStars(stars_recieved);
    const pointsRepos = getPointsForRepos(public_repos);
    const pointsFollowers = getPointsForFollowers(followers);
    const pointsOrganizations = getPointsForOrganizations(organizations_count);
    const pointsContributions = getPointsForContributions(
      total_prs_merged,
      total_issues_created
    );

    const weightedStars = pointsStars * 0.25;
    const weightedRepos = pointsRepos * 0.15;
    const weightedFollowers = pointsFollowers * 0.2;
    const weightedOrganizations = pointsOrganizations * 0.1;
    const weightedContributions = pointsContributions * 0.3;

    const totalWeightedScore =
      weightedStars +
      weightedRepos +
      weightedFollowers +
      weightedOrganizations +
      weightedContributions;
    const normalizedRating = (totalWeightedScore / 5) * 5;

    return normalizedRating;
  } catch (e) {
    console.error(e);
    return 0;
  }
};
