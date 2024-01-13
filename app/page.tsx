"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  //Function handlers
  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };

  const handleGenerateClick = () => {
    router.push(`/resume/${username}`);
  };

  return (
    <main className="flex min-h-[83.5vh] flex-col items-center justify-between p-24">
      <div className="relative flex flex-col mt-16 gap-14 place-items-center">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 z-10">
          <h1 className="text-8xl font-black text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
              git-re
            </span>
          </h1>
          <p className="w-11/12 text-4xl font-semibold text-center">
            Elevate your&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
              GitHub
            </span>
            &nbsp;to a dynamic&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
              resume
            </span>
            &nbsp;effortlessly.
          </p>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-8">
          {/* Handle username input */}
          <Input
            type="text"
            placeholder="Enter your GitHub username"
            className="h-12"
            value={username}
            onChange={handleUsernameChange}
          />
          <Button type="button" className="h-12" onClick={handleGenerateClick}>
            Generate
          </Button>
        </div>
      </div>
    </main>
  );
}
