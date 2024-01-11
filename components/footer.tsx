import React, { ReactNode } from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const icons: { title: string; href: string; icon: ReactNode }[] = [
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/rathashutosh/",
      icon: <LinkedInLogoIcon height="20" width="20" />,
    },
    {
      title: "Github",
      href: "https://github.com/ashutosh-rath02",
      icon: <GitHubLogoIcon height="20" width="20" />,
    },
    {
      title: "Twitter",
      href: "https://twitter.com/v_ashu_dev",
      icon: <TwitterLogoIcon height="20" width="20" />,
    },
  ];

  return (
    <footer className="mx-auto w-full cursor-default items-center justify-center backdrop-blur-sm py-4 text-center shadow-xl md:px-0">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-y-4 shadow-xl md:flex-row md:gap-y-0">
        <Link href="/#">
          <span className="text-lg font-black flex flex-row items-center justify-center gap-2">
            <GitHubLogoIcon width="22" height="22" />
            git-re
          </span>
        </Link>

        <p className="text-xs font-light">
          &copy; {currentYear} Made with 🤯 by Ashutosh Rath
        </p>

        <div className="flex gap-4">
          {icons.map((icon, index) => (
            <Link href={icon.href} target="_blank" key={index}>
              {icon.icon}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  );
}
