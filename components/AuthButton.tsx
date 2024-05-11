"use client";
import React from "react";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { supabaseBrowser } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { IconCubeUnfolded, IconLogout } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type AuthButtonProps = {
  user: User | null;
  height?: number;
  width?: number;
  className?: string;
};

export default function AuthButton({
  user,
  height,
  width,
  className,
}: AuthButtonProps) {
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
      variant="newDefault"
      className={`animate-shimmer h-10 ${className}`} // Add className prop to the Button
      onClick={handleLogout}
    >
      <IconLogout stroke={2} className="mr-2" />
      Logout
    </Button>
  ) : (
    <Button
      variant="newDefault"
      className={cn(className, "animate-shimmer h-10")}
      onClick={handleLoginWithGithub}
    >
      <IconCubeUnfolded stroke={1} className="mr-2" />
      Build Resume
    </Button>
  );
}
