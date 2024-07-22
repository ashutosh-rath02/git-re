"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { SetStateAction, useState } from "react";
import { getCoverLetter } from "@/utils/Gemini";
import Loader from "./Loader";
import { supabase } from "@/utils/supabase/client";

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(10, { message: "Detailed job description required!!" })
    .max(10000),
  project: z.string().min(10, { message: "Project required!!" }).max(4000),
  skills: z.string().min(10, { message: "Skills required!!" }).max(1000),
  experience: z
    .string()
    .min(10, { message: "Experinece required!!" })
    .max(4000),
});

type Props = {
  isJobDescription: boolean;
  isResumeDetails: boolean;
  isSubmit: boolean;
  setIsJobDescription: React.Dispatch<SetStateAction<boolean>>;
  setIsResumeDetails: React.Dispatch<SetStateAction<boolean>>;
  setIsResponseGenerated: React.Dispatch<SetStateAction<boolean>>;
  setIsError: React.Dispatch<SetStateAction<boolean>>;
  setIsSubmit: React.Dispatch<SetStateAction<boolean>>;
  user: any;
  setResponse: React.Dispatch<SetStateAction<string>>;
};

export default function CoverLetterForm({
  isJobDescription,
  isResumeDetails,
  isSubmit,
  setIsJobDescription,
  setIsSubmit,
  setIsResumeDetails,
  setIsResponseGenerated,
  setIsError,
  setResponse,
  user,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
      project: "",
      skills: "",
      experience: "",
    },
  });

  async function handleNextClick(firstForm: boolean, secForm: boolean) {
    if (firstForm) {
      const isValid = await form.trigger("jobDescription");
      if (isValid) {
        setIsJobDescription(false);
        setIsResumeDetails(true);
      } else {
        setIsJobDescription(true);
      }
    } else {
      const isValid = await form.trigger(["project", "skills", "experience"]);
      if (isValid) {
        setIsResumeDetails(false);
        setIsSubmit(true);
      } else {
        setIsResumeDetails(true);
      }
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { jobDescription, project, skills, experience } = values;
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data: existingUsageData, error: fetchError } = await supabase
        .from("usage_tracking")
        .select("usage_count")
        .eq("github_username", user!.user_metadata.preferred_username)
        .eq("date", today);

      if (existingUsageData && existingUsageData[0].usage_count >= 2) {
        setIsResponseGenerated(true);
        setIsError(true);
        setResponse("You have reached your usage limit for today.");
        setIsLoading(false);
        return;
      }

      // Add your existing cover letter generation logic here
      const res = await getCoverLetter({
        jobDescription,
        project,
        skills,
        experience,
      });

      if (res) {
        setIsError(false);
        setIsResponseGenerated(true);
        setResponse(res);
      }

      // After generating the cover letter, update the usage count
      if (fetchError) {
        setIsError(true);
        setResponse("There was an error fetching your usage data.");
        return;
      }

      if (existingUsageData && existingUsageData.length > 0) {
        const newUsageCount = existingUsageData[0].usage_count + 1;
        const { error: updateError } = await supabase
          .from("usage_tracking")
          .update({ usage_count: newUsageCount })
          .eq("github_username", user!.user_metadata.preferred_username)
          .eq("date", today);

        if (updateError) {
          setIsError(true);
          setResponse("There was an error updating your usage count.");
        }
      } else {
        const { error: insertError } = await supabase
          .from("usage_tracking")
          .insert({
            github_username: user!.user_metadata.preferred_username,
            date: today,
            usage_count: 1,
          });

        if (insertError) {
          setIsError(true);
          setResponse("There was an error inserting your usage data.");
        }
      }
    } catch (err) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[80%] h-full p-2 md:p-10"
      >
        {isJobDescription && (
          <>
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[400px]"
                      placeholder="Detailed Job description with requirements..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"secondary"}
              onClick={() => handleNextClick(true, false)}
              className="flex gap-1"
              type="button"
            >
              Next <ArrowRightIcon className="w-5 h-5" />{" "}
            </Button>
          </>
        )}
        {isResumeDetails && (
          <>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[100px]"
                      placeholder="Skills..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[300px]"
                      placeholder="Projects..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[400px]"
                      placeholder="Experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={"secondary"}
              onClick={() => handleNextClick(false, true)}
              className="flex gap-1"
              type="button"
            >
              Next <ArrowRightIcon className="w-5 h-5" />{" "}
            </Button>
          </>
        )}
        {isSubmit && (
          <>
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[100px]"
                      placeholder="Job Description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[100px]"
                      placeholder="Skills..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Projects</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[300px]"
                      placeholder="Projects..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-[400px]"
                      placeholder="Experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              className="flex gap-1 text-white"
              type="submit"
            >
              {isLoading ? <Loader /> : "Submit"}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
