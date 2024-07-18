"use server";
import { supabaseServer } from "@/utils/supabase/server";

const supabase = supabaseServer();

type LeaderboardProp = {
  page?: number;
  searchQuery?: string;
};

export const getLeaderboard = async ({
  page = 1,
  searchQuery = "",
}: LeaderboardProp) => {
  try {
    const itemsPerPage = 20;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    let query = supabase
      .from("recent_users")
      .select("*", { count: "exact" })
      .neq("rating", "-0.1")
      .order("rating", { ascending: false })
      .range(from, to);

    if (searchQuery) {
      query = query.ilike("username", `%${searchQuery}%`);
    }

    const { data, error, count } = await query;

    const maxPages = count ? Math.ceil(count / itemsPerPage) : 0;

    if (error) throw error;

    return { data, maxPages };
  } catch (error) {
    throw error;
  }
};

export const getIndividualUserRank = async (username: string) => {
  try {
    const { data, error } = await supabase.rpc("get_user_rank", {
      user_username: username,
    });

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
