"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CoverLetterForm from "./CoverLetterForm";
import CoverLetterDialog from "./CoverLetterDialog";
import { supabase } from "@/utils/supabase/client";
import { UserData } from "@/types";

type Props = {
  user: any;
};

export default function CoverLetter({ user }: Props) {
  const router = useRouter();
  const [isJobDescription, setIsJobDescription] = useState(true);
  const [isResume, setIsResume] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [isResponseGenerated, setIsResponseGenerated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (user) {
      checkUsageLimit();
    } else {
      router.push("/");
    }
  }, [user]);

  const checkUsageLimit = async () => {
    const { data, error } = await supabase
      .from("usage_tracking")
      .select("usage_count")
      .eq("github_username", user!.user_metadata.preferred_username)
      .eq("date", new Date().toISOString().split("T")[0]);

    if (data && data[0] && data[0].usage_count >= 2) {
      setIsResponseGenerated(true);
      setIsError(true);
      setResponse(
        "You have reached your daily limit!! Please try again tomorrow!!"
      );
    }
  };

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
            setIsError={setIsError}
            setIsResponseGenerated={setIsResponseGenerated}
            isJobDescription={isJobDescription}
            isResumeDetails={isResume}
            isSubmit={isSubmit}
            setIsResumeDetails={setIsResume}
            setIsJobDescription={setIsJobDescription}
            setResponse={setResponse}
            setIsSubmit={setIsSubmit}
            user={user!}
          />
        </div>
        <CoverLetterDialog
          setResponse={setResponse}
          isResponseGenerated={isResponseGenerated}
          setIsResponseGenerated={setIsResponseGenerated}
          response={response}
          isError={isError}
        />
      </div>
    </div>
  );
}
