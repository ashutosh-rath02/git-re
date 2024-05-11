import React, { ReactNode } from "react";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const TwitterX = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
      <g transform=""><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="none" stroke-linecap="butt" stroke-linejoin="none" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><path transform="scale(8.53333,8.53333)" d="M24,4c1.105,0 2,0.895 2,2v18c0,1.105 -0.895,2 -2,2h-18c-1.105,0 -2,-0.895 -2,-2v-18c0,-1.105 0.895,-2 2,-2z" id="strokeMainSVG" fill="#190d0d" stroke="#190d0d" stroke-width="3" stroke-linejoin="round"></path><g transform="scale(8.53333,8.53333)" fill="#ffffff" stroke="none" stroke-width="1" stroke-linejoin="miter"><path d="M6,4c-1.105,0 -2,0.895 -2,2v18c0,1.105 0.895,2 2,2h18c1.105,0 2,-0.895 2,-2v-18c0,-1.105 -0.895,-2 -2,-2zM8.64844,9h4.61133l2.69141,3.84766l3.33008,-3.84766h1.45117l-4.12891,4.78125l5.05078,7.21875h-4.61133l-2.98633,-4.26953l-3.6875,4.26953h-1.47461l4.50586,-5.20508zM10.87891,10.18359l6.75391,9.62695h1.78906l-6.75586,-9.62695z"></path></g></g></g>
    </svg>
  );
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
      icon: <TwitterX />,
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
