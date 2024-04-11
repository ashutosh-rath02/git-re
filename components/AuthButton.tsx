"use client";
import React from "react";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { supabaseBrowser } from "@/utils/supabase/client";

async function handleLoginWithGithub() {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: location.origin + "/auth/callback",
    },
  });

  if (error) {
    console.error("Login Error:", error);
  }
}

export default function AuthButton() {
  return (
    <Button variant={"outline"} onClick={handleLoginWithGithub}>
      <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login
    </Button>
  );
}
