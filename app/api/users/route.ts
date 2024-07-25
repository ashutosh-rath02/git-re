import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { supabaseBrowser } from "@/utils/supabase/client";
import redis from "@/lib/redis";
import { CACHE_TTL } from "@/lib/consts";

const supabase = supabaseBrowser();

const getFromCache = async (key: string) => {
  const cachedData = await redis.get(key) as any;
  if (cachedData) {
    console.log("LOADED FROM CACHE");
    return JSON.parse(cachedData);
  }
  return null;
};

const setInCache = async (key: string, data: any, expirationSeconds: number) => {
  await redis.set(key, JSON.stringify(data), {
    ex: expirationSeconds,
  });
};

export async function POST(request: NextRequest) {
  try {
    const { git_username } = await request.json();

    if (!git_username) {
      return new Response("Username is required", { status: 400 });
    }

    const { data: existingUser, error: existingUserError } = await supabase
      .from("recent_users")
      .select("*")
      .eq("username", git_username)
      .single();

    if (existingUserError && existingUserError.code !== "PGRST116") {
      throw new Error(existingUserError.message);
    }

    if (existingUser) {
      return new Response("Username already exists", { status: 200 });
    }

    const response = await axios.get(`https://api.github.com/users/${git_username}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    const userData = {
      name: response.data.name || "",
      avatar_url: response.data.avatar_url || "",
      bio: response.data.bio || "",
      username: response.data.login || "",
    };

    if (!userData.username) {
      console.log("Data is NULL. User is rate-limited by GitHub");
      return new Response("Data is NULL. You are rate-limited, please try again later.", { status: 500 });
    }

    const { data, error } = await supabase
      .from("recent_users")
      .insert([
        {
          username: userData.username,
          name: userData.name,
          bio: userData.bio,
          avatar_url: userData.avatar_url,
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return new Response("Username added successfully", { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof Error) {
      return new Response(error.message || "Internal Server Error", { status: 500 });
    }

    return new Response("Unexpected Error", { status: 500 });
  }
}

export async function GET() {
  const cacheKey = "recent-users";
  try {
    const cachedUsers = await getFromCache(cacheKey);

    if (cachedUsers) {
      return new Response(JSON.stringify(cachedUsers), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { data: users, error } = await supabase
      .from("recent_users")
      .select("*")
      .order("id", { ascending: false })
      .limit(7);

    if (error) {
      return new Response(
        JSON.stringify({
          err_message: error.message,
          details: error.details,
          error_code: error.code,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    await setInCache(cacheKey, users, CACHE_TTL);

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);

    if (error instanceof Error) {
      return new Response(error.message || "Internal Server Error", { status: 500 });
    }

    return new Response("Unexpected Error", { status: 500 });
  }
}
