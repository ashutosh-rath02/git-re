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
    <Button variant="outline" onClick={handleLogout}>
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Logout
    </Button>
  ) : (
    <Button variant="outline" onClick={handleLoginWithGithub}>
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with GitHub
    </Button>
  );
}
