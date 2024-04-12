"use client";
import React from "react";
import { Button } from "./ui/button"; // Assuming a type definition exists
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { supabaseBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type AuthButtonProps = {
  user: User | null;
};

export default function AuthButton({ user }: AuthButtonProps) {
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
      className="inline-flex h-9 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={handleLogout}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Logout
    </Button>
  ) : (
    <Button
      variant="outline"
      className="inline-flex h-9 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      onClick={handleLoginWithGithub}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login
    </Button>
  );
}
