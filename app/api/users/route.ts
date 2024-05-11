import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/utils/models/UserModel";
// import connectDB from "@/utils/config/db";
import { supabaseServer } from "@/utils/supabase/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    console.log(request);
    const { git_username } = await request.json();
    const supabase = supabaseServer();
    const { data } = await supabase.auth.getUser();

    if (!git_username) {
      return new Response("Username is required", { status: 400 });
    }

    // await connectDB();
    const existingUser = await UserModel.findOne({ git_username });

    if (existingUser) {
      console.log("user already exits");
      return new Response("Username updated successfully", { status: 200 });
    }

    const userCount = await UserModel.countDocuments();
    if (userCount >= 6) {
      const oldestUser = await UserModel.findOne().sort({ _id: 1 });
      console.log(oldestUser);
      await UserModel.findOneAndDelete({
        username: oldestUser.username,
      });
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
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        bio: response.data.bio,
        username: response.data.login,
        userId: data.user?.id,
      };
      console.log(userData);
      const newUser = new UserModel(userData);
      await newUser.save();
      return new Response("Username updated successfully", { status: 200 });
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
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  try {
    // await connectDB();
    const users = await UserModel.find({
      userId: data.user?.id,
    });
    return NextResponse.json(users.reverse());
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
