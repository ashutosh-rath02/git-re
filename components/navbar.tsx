import React from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IoMdGitNetwork } from "react-icons/io";
import Link from "next/link";

export default function Navbar() {
  const repositoryUrl = "https://github.com/ashutosh-rath02/git-re";

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border px-20">
      <Link
        href={"/"}
        className="text-lg font-black flex flex-row items-center justify-center gap-2 cursor-pointer"
      >
        <GitHubLogoIcon width="22" height="22" />
        git-re
      </Link>
      <div className="flex items-center gap-4">
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg hover:text-primary cursor-pointer flex items-center gap-1"
        >
          <IoMdGitNetwork size={22} />
          Fork
        </a>
        <ModeToggle />
      </div>
    </header>
  );
}
