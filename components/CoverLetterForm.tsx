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
import { SetStateAction } from "react";

const formSchema = z.object({
  jobDescription: z
    .string()
    .min(10, { message: "Detailed job description required!!" })
    .max(10000),
  project: z.string().min(10, { message: "Project required!!" }).max(1000),
  skills: z.string().min(10, { message: "Skills required!!" }).max(1000),
  experience: z
    .string()
    .min(10, { message: "Experinece required!!" })
    .max(1000),
});

type Props = {
  isJobDescription: boolean;
  isResumeDetails: boolean;
  isSubmit: boolean;
  setIsJobDescription: React.Dispatch<SetStateAction<boolean>>;
  setIsResumeDetails: React.Dispatch<SetStateAction<boolean>>;
  setIsSubmit: React.Dispatch<SetStateAction<boolean>>;
};

export default function CoverLetterForm({
  isJobDescription,
  isResumeDetails,
  isSubmit,
  setIsJobDescription,
  setIsSubmit,
  setIsResumeDetails,
}: Props) {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
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
                  <FormLabel>Projects</FormLabel>
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
                  <FormLabel>Projects</FormLabel>
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
            <Button className="flex gap-1 text-white" type="submit">
              Submit
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
