import React from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IoMdGitNetwork } from "react-icons/io";
import Link from "next/link";

import AuthButton from "./AuthButton";
import Hamburger from "./Hamburger";
import { supabaseServer } from "@/utils/supabase/server";

export default async function Navbar() {
  const repositoryUrl = "https://github.com/ashutosh-rath02/git-re";

  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 bg-black bg-opacity-50 z-50 max-w-screen-2xl mx-auto sm:px-20 md:px-8 lg:px-20 px-8 m-2 p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Link
          href={"/"}
          className="text-lg font-black flex flex-row items-center justify-center gap-2 cursor-pointer"
        >
          <GitHubLogoIcon width="22" height="22" />
          git-re
        </Link>
      </div>
      <div className="flex flex-row items-center space-x-8 md:space-x-4 lg:space-x-8">
        <Link
          href={"/"}
          rel="noopener noreferrer"
          className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
        >
          Home
        </Link>
        <Link
          href="/#userTestimonials"
          className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
          style={{ scrollBehavior: "smooth" }}
        >
          Testimonial
        </Link>
        <Link
          href={"/leaderboard"}
          rel="noopener noreferrer"
          className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
        >
          Leaderboard
        </Link>
        <Link
          href={"/compare"}
          rel="noopener noreferrer"
          className="text-navbarSecondary hover:text-primary font-semibold transition md:block hidden dark:text-white"
        >
          Compare
        </Link>

        <AuthButton user={data.user} className="hidden sm:flex" />

        <Hamburger />
      </div>
    </nav>
  );
}
