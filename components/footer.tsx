import React, { ReactNode } from "react";
import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconBrandX,
  IconStarFilled,
} from "@tabler/icons-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const icons: { title: string; href: string; icon: ReactNode }[] = [
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/rathashutosh/",
      icon: <IconBrandLinkedin stroke={2} height={24} width={24} />,
    },
    {
      title: "Github",
      href: "https://github.com/ashutosh-rath02",
      icon: <IconBrandGithub stroke={2} height={24} width={24} />,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/v_ashu_dev",
      icon: <IconBrandX stroke={2} height={24} width={24} />,
    },
  ];

  return (
    <footer className="max-w-screen-2xl mx-auto m-2 p-4 w-full flex flex-col space-y-12 sm:flex-row justify-between items-start">
      <div className="flex flex-col max-w-96">
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
        <h3 className="text-lg font-medium text-[#7E7E7E] mt-4 tracking-wide">
          {"Code · Showcase · Impress"}
        </h3>
        <Link
          href="https://github.com/ashutosh-rath02/git-re/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="w-48 mt-8 rounded-sm py-4 text-base font-semibold dark:text-white flex flex-row items-center bg-primary text-white justify-center"
        >
          <IconStarFilled className="mr-2" />
          Star on GitHub
        </Link>
      </div>
      {/* LINKS */}
      <div className="flex flex-col">
        <div className="flex flex-row space-x-16">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-primary">Legal</h4>
            <Link
              href="/privacy"
              className="text-[#7E7E7E] font-medium mt-3 dark:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#7E7E7E] font-medium dark:text-white"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-primary">
              Important Links
            </h4>
            <Link
              href="https://github.com/ashutosh-rath02/git-re/"
              className="mt-3 text-[#7E7E7E] font-medium dark:text-white"
            >
              Contribute
            </Link>
            <Link
              href="https://www.producthunt.com/products/git-re"
              className="text-[#7E7E7E] font-medium dark:text-white"
            >
              Vote on Product Hunt
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-star items-center sm:justify-between space-x-8 mt-7">
          <ModeToggle />
          <div className="flex flex-row items-center space-x-8">
            {icons.map(({ title, href, icon }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7E7E7E] hover:text-primary dark:text-white"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
