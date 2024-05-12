"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Form() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setUsername(e.target.value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/resume/${username}`);
      setIsLoading(false);
    }, 3000);
    try {
      const response = await axios.post("/api/users", {
        git_username: username,
      });
      console.log(response);
    } catch (error) {
      console.error(`error saving the data ${error}`);
    }
  };
  return (
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
  );
}
