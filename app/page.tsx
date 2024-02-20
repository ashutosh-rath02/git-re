"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./globals.css";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/resume/${username}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="flex min-h-[83vh] flex-col items-center justify-center p-4 lg:px-24">
      <div className="relative flex flex-col w-full max-w-4xl gap-8 place-items-center">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
              git-re
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-4xl font-semibold">
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
        <div className="flex w-full md:max-w-sm items-center space-x-4 md:space-x-8">
          <form className="flex w-full space-x-3" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter your GitHub username"
              className="h-12 flex-grow"
              value={username}
              onChange={handleUsernameChange}
            />
            <Button
              type="submit"
              disabled={isLoading || username.trim() === ""}
              className="h-12 px-6 flex items-center justify-center"
            >
              {isLoading ? <div className="loader1"></div> : "Generate"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
