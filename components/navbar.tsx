"use client"
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { IoMdGitNetwork } from "react-icons/io";
import Link from "next/link";
import AuthButton from "./AuthButton";
import Hamburger from "./Hamburger";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs"; // Import User type

const Navbar: React.FC = () => {
  const repositoryUrl = "https://github.com/ashutosh-rath02/git-re";
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [user, setUser] = useState<User | null>(null); // Set the state type to User or null

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClientComponentClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    const isScrollingUp = prevScrollPos > currentScrollPos;

    setIsVisible(isScrollingUp || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`max-w-screen-2xl bg-black z-50 fixed top-0 mx-auto sm:px-20 px-3 p-4 w-full flex items-center justify-between transition-transform duration-300 ${isVisible ? "transform translate-y-0" : "transform -translate-y-full"}`}>

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

        <AuthButton user={user} className="hidden sm:flex" />

        <Hamburger />
      </div>
    </nav>
  );
};

export default Navbar;
