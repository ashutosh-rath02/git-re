"use client";  // Mark this component as a Client Component

import React, { useEffect, useState } from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IoMdGitNetwork } from "react-icons/io";
import Link from "next/link";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";
import Hamburger from "./Hamburger";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";  // Import the usePathname hook

export default function Navbar() {
  const repositoryUrl = "https://github.com/ashutosh-rath02/git-re";
  const supabase = createClientComponentClient();  // Use client-side Supabase client
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, [supabase]);

  const currentPath = usePathname();  // Use the usePathname hook to get the current path

  return (
    <nav className="max-w-screen-2xl mx-auto sm:px-20 px-3 m-2 p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Link
          href={"/"}
          className="text-lg font-black flex flex-row items-center justify-center gap-2 cursor-pointer"
        >
          <GitHubLogoIcon width="22" height="22" />
          git-re
        </Link>
      </div>
      <div className="flex flex-row items-center space-x-8">
        <Link
          href={"/"}
          rel="noopener noreferrer"
          className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
        >
          Home
        </Link>
        {currentPath === "/leaderboard" ? (
          <Link
            href={"/#userTestimonials"}
            className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
            style={{ scrollBehavior: "smooth" }}
          >
            Testimonial
          </Link>
        ) : (
          <a
            href="#userTestimonials"
            className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
            style={{ scrollBehavior: "smooth" }}
          >
            Testimonial
          </a>
        )}
        <Link
          href={"/leaderboard"}
          rel="noopener noreferrer"
          className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
        >
          Leaderboard
        </Link>

        <AuthButton user={user} />

        <Hamburger />
      </div>
    </nav>
  );
}
