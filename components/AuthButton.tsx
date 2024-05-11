"use client";
import React from "react";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { supabaseBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type AuthButtonProps = {
  user: User | null;
  height?: number;
  width?: number;
};

export default function AuthButton({ user, height, width }: AuthButtonProps) {
  const router = useRouter();

  const handleLoginWithGithub = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };

  return user ? (
    <Button
      variant="outline"
      className="inline-flex items-center justify-center rounded-md px-12 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all h-10 border border-slate-800 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-black focus:ring-gray-400"
      onClick={handleLogout}
    >
      <GitHubLogoIcon className="mr-2 size-5" /> Logout
    </Button>
  ) : (
    <Button
      variant="outline"
      className="inline-flex items-center justify-center rounded-md px-12 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all h-11 border-2 border-slate-800 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-black focus:ring-gray-400"
      onClick={handleLoginWithGithub}
    >
      <GitHubLogoIcon className="mr-2 size-5" /> Login
    </Button>
  );
}
