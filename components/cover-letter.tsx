"use client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "./ui/button";
import CoverLetterForm from "./CoverLetterForm";

type Props = {
  user: User | null;
};

export default function CoverLetter({ user }: Props) {
  const router = useRouter();
  const [isJobDescription, setIsJobDescription] = useState(true);
  const [isResume, setIsResume] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  if (user === null) {
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full p-2">
        <div className="flex w-full my-10 items-center justify-center">
          <div className="border-[#B1B2FF] w-[10%] border-0 border-b-2" />
          <Button
            className={`${
              !isJobDescription
                ? "dark:bg-[#051129] bg-blue-400 border-gray-400 border"
                : ""
            }`}
            variant={"newDefault"}
          >
            1.Job Description
          </Button>
          <div className="border-[#B1B2FF] w-[10%] border-0 border-b-2" />
          <Button
            className={`${
              !isResume
                ? "dark:bg-[#051129] bg-blue-400 border-gray-400 border"
                : ""
            }`}
            variant={"newDefault"}
          >
            2.Resume
          </Button>
          <div className="border-[#B1B2FF] w-[10%] border-0 border-b-2" />
          <Button
            className={`${
              !isSubmit
                ? "dark:bg-[#051129] bg-blue-400 border-gray-400 border"
                : ""
            }`}
            variant={"newDefault"}
          >
            3.Submit
          </Button>
          <div className="border-[#B1B2FF] w-[10%] border-0 border-b-2" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <CoverLetterForm
            isJobDescription={isJobDescription}
            isResumeDetails={isResume}
            isSubmit={isSubmit}
            setIsResumeDetails={setIsResume}
            setIsJobDescription={setIsJobDescription}
            setIsSubmit={setIsSubmit}
          />
        </div>
      </div>
    </div>
  );
}
