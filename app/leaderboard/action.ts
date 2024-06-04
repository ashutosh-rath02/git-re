"use server";
import { supabaseServer } from "@/utils/supabase/server";

const supabase = supabaseServer();

type LeaderboardProp = {
  page?: number;
};

export const getLeaderboard = async ({ page }: LeaderboardProp) => {
  try {
    const { data, error } = await supabase
      .from("recent_users")
      .select("*")
      .neq("rating", "-0.1")
      .order("rating", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};
