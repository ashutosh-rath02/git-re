"use client";
import React, { useState } from "react";
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
  const [isLoading, setLoading] = useState(false);

  const handleLoginWithGithub = () => {
    const supabase = supabaseBrowser();
    setLoading(true);
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    setLoading(true);
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
    setLoading(false);
  };

  return user ? (
    <Button
      variant="newDefault"
      className={`animate-shimmer h-10 ${className}`}
      disabled={isLoading}
      onClick={handleLogout}
    >
      <IconLogout stroke={2} className="mr-2" />
      {isLoading ? <div className="loader1"></div> : "Logout"}
    </Button>
  ) : (
    <Button
      variant="newDefault"
      className={cn(className, "animate-shimmer h-10")}
      disabled={isLoading}
      onClick={handleLoginWithGithub}
    >
      <IconCubeUnfolded stroke={1} className="mr-2" />
      {isLoading ? <div className="loader1"></div> : "Build Resume"}
    </Button>
  );
}
