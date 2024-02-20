/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IoMdGitNetwork } from "react-icons/io";
import Link from "next/link";

export default function Navbar() {
  const repositoryUrl = "https://github.com/ashutosh-rath02/git-re";

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border px-2 lg:px-20">
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
        <a
          href="https://www.producthunt.com/posts/git-re?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-git&#0045;re"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=438558&theme=light"
            alt="git&#0045;re - Elevate&#0032;your&#0032;GitHub&#0032;to&#0032;a&#0032;dynamic&#0032;resume&#0032;effortlessly | Product Hunt"
            style={{ width: "200px", height: "50px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </header>
  );
}
