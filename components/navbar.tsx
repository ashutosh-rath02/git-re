import React from "react";
import { ModeToggle } from "./shared/ToggleBg";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border px-20">
      <span className="text-lg font-black flex flex-row items-center justify-center gap-2">
        <GitHubLogoIcon width="22" height="22" />
        git-re
      </span>
      <ModeToggle />
    </header>
  );
}
