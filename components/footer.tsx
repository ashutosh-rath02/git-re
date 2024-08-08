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
import GitHubStarCount from './GitHubStarCount'; 

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
    <footer className="max-w-screen-2xl mx-auto sm:px-20 px-3 m-2 p-4 w-full flex flex-col space-y-12 sm:flex-row justify-between items-start">
      <div className="flex flex-col max-w-96">
        <div className="flex items-center gap-x-2">
          <Link
            href={"/"}
            className="text-lg font-black flex flex-row items-center justify-center gap-2 cursor-pointer"
          >
            <GitHubLogoIcon width="22" height="22" />
            git-re
          </Link>
        </div>
        <h3 className="text-lg font-medium text-secondaryText mt-4 tracking-wide dark:text-white">
          {"Code · Showcase · Impress"}
        </h3>
        <h4 className="mt-4 text-sm font-medium text-secondaryText dark:text-gray-200">
          {" "}
          &copy; {currentYear} Made with 🤯 by{" "}
          <Link
            href="https://www.ashutoshrath.me/"
            target="_blank"
            className="hover:text-primary transition"
          >
            Ashutosh Rath
          </Link>
        </h4>
        <Link
          href="https://github.com/ashutosh-rath02/git-re/tree/main"
          target="_blank"
          rel="noopener noreferrer"
          className="w-48 mt-8 rounded-sm py-4 text-base font-semibold dark:text-white flex flex-row items-center bg-primary text-white justify-center"
        >
         
          <GitHubStarCount repoUrl="https://github.com/ashutosh-rath02/git-re" /> 
          <p className="pl-2 pr-2">  Stars on </p> <GitHubLogoIcon width="22" height="22" />
        </Link>
      </div>
      {/* LINKS */}
      <div className="flex flex-col">
        <div className="flex flex-row space-x-16">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold text-primary">
              Important Links
            </h4>
            <Link
              href="https://github.com/ashutosh-rath02/git-re/"
              className="mt-3 text-secondaryText font-medium dark:text-white hover:text-primary dark:hover:text-primary transition"
              target="_blank"
            >
              Contribute
            </Link>
            <Link
              href="https://www.producthunt.com/products/git-re"
              className="text-secondaryText font-medium dark:text-white hover:text-primary dark:hover:text-primary transition"
              target="_blank"
            >
              Vote on Product Hunt
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-star items-center sm:justify-between space-x-8 mt-7">
          <ModeToggle />
          <div className="flex flex-row items-center space-x-4">
            {icons.map(({ title, href, icon }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondaryText hover:text-primary dark:text-white dark:hover:text-primary"
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
