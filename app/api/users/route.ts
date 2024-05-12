import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { supabaseBrowser } from "@/utils/supabase/client";

const supabase = supabaseBrowser();

export async function POST(request: NextRequest) {
  try {
    const { git_username } = await request.json();

    if (!git_username) {
      return new Response("Username is required", { status: 400 });
    }

    const existingUser = await supabase
      .from("recent_users")
      .select("*")
      .eq("username", git_username)
      .single();

    if (existingUser.data && existingUser.data.name) {
      console.log("User already exists");
      return new Response("Username already exists", { status: 400 });
    }

    try {
      const response = await axios.get(
        `https://api.github.com/users/${git_username}`,
        {
          params: {
            fields: "login,bio,avatar_url,name",
          },
        }
      );

      const userData = {
        name: response.data.name || "",
        avatar_url: response.data.avatar_url || "",
        bio: response.data.bio || "",
        username: response.data.login || "",
      };

      if (!userData.name) {
        console.log("Data is NULL. User is rate-limited by GitHub");
        return new Response(
          "Data is NULL. You are rate-limited, please try again later.",
          { status: 500 }
        );
      }

      const { data, error } = await supabase.from("recent_users").insert([
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
      console.error("Error fetching user data:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } catch (error) {
    console.error("Error updating username:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from("recent_users")
      .select("*")
      .order("id", { ascending: false })
      .limit(7);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
