"use server";
import { supabaseServer } from "@/utils/supabase/server";

const supabase = supabaseServer();

type LeaderboardProp = {
  page?: number;
};

export const getLeaderboard = async ({ page = 1 }: LeaderboardProp) => {
  try {
    const itemsPerPage = 20;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data, error } = await supabase
      .from("recent_users")
      .select("*")
      .neq("rating", "-0.1")
      .order("rating", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};
