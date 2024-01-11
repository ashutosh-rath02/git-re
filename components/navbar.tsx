import React from "react";
import { ModeToggle } from "./shared/ToggleBg";

export default function Navbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border px-20">
      <span className="text-lg font-black">Template</span>
      <ModeToggle />
    </header>
  );
}
