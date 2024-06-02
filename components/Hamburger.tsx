"use client";
import React, { useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross1Icon } from "@radix-ui/react-icons";
import Link from "next/link";

const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative">
      {!menuOpen ? (
        <HamburgerMenuIcon
          className="cursor-pointer flex md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
        />
      ) : (
        <Cross1Icon
          className="cursor-pointer flex md:hidden"
          onClick={() => {
            setMenuOpen((prev) => !prev);
          }}
        />
      )}
      {menuOpen && (
        <div className="absolute z-50 w-fit h-fit p-3  top-6 -right-4 rounded-md flex md:hidden flex-col gap-2 ">
          <div className="w-full h-fit p-2 border rounded-md">
            <Link
              href={"/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navbarSecondary hover:text-primary font-semibold transition flex md:hidden  dark:text-white"
            >
             Home
            </Link>
          </div>

          <div className="w-full h-fit p-2 border rounded-md">
            <Link
              href="#"
              className="text-navbarSecondary hover:text-primary font-semibold transition flex md:hidden  dark:text-white"
            >
              Testimonial
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hamburger;
