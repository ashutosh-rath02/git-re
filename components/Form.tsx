"use client";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast, useToast } from "@/components/ui/use-toast";
import axios from "axios";
import MagicButton from "./ui/MagicButton";

export default function Form() {
  const [username, setUsername] = useState<string>("");
  const [usernameFound, setUsernameFound] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (!usernameFound) {
      setUsernameFound(true); // Reset the state when user starts typing
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //Regex to match github username validation
    const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!regex.test(username)) {
      toast({
        title: "Error",
        description: "Not a valid GitHub username.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const githubResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      if (githubResponse.status === 404) {
        setUsernameFound(false);
        setIsLoading(false);
        return;
      }

      if (githubResponse.status !== 200) {
        console.log("Unexpected error occurred");
        setIsLoading(false);
        return;
      }

      const saveResponse = await axios.post("/api/users", {
        git_username: username,
      });
      router.push(`/resume/${username}`);
    } catch (error: any) {
      if (
        error.response?.status === 404 ||
        error.response?.data.message === "Not Found"
      ) {
        toast({
          title: "Error",
          description: "Username Not Found",
          variant: "destructive",
        });
        setIsLoading(false);
        setUsernameFound(false);
        return;
      }
      console.error(`Error occurred: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full md:max-w-sm items-center space-x-4 md:space-x-8">
      <form className="flex w-full space-x-3" onSubmit={handleSubmit}>
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Enter your GitHub username"
            className="h-12 w-full"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-12 px-6 flex items-center justify-center"
        >
          {isLoading ? <div className="loader1"></div> : "Generate"}
        </Button>
      </form>
    </div>
  );
}
