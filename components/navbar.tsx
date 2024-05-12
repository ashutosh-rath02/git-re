import React from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IoMdGitNetwork } from "react-icons/io";
import Link from "next/link";
import { Button } from "./ui/button";
import AuthButton from "./AuthButton";
import { supabaseServer } from "@/utils/supabase/server";
import { IconBrandGithubFilled, IconCubeUnfolded } from "@tabler/icons-react";

export default async function Navbar() {
  const repositoryUrl = "https://github.com/ashutosh-rath02/git-re";

  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();

  return (
    <nav className="max-w-screen-2xl mx-auto m-2 mt-7 p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        {/* <div>
          <IconBrandGithubFilled className="text-primaryLight sm:w-[36px] sm:h-[36px] w-[30px] h-[30px]" />
        </div>
        <h1 className="sm:text-3xl text-2xl font-semibold text-primaryLight">
          git-re
        </h1> */}
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
          href="https://github.com/ashutosh-rath02/git-re"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[3C3C3C] hover:text-primary font-semibold transition sm:block hidden"
        >
          Opensource
        </Link>
        <Link
          href="#"
          className="text-[3C3C3C] hover:text-primary font-semibold transition sm:block hidden"
        >
          Testimonial
        </Link>

        <AuthButton user={data.user} />
      </div>
    </nav>
  );
}
