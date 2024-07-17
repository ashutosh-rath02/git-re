import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SetStateAction, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type Props = {
  setIsResponseGenerated: React.Dispatch<SetStateAction<boolean>>;
  setResponse: React.Dispatch<SetStateAction<string>>;
  isResponseGenerated: boolean;
  response: string;
  isError: boolean;
};

export default function CoverLetterDialog({
  isResponseGenerated,
  setIsResponseGenerated,
  response,
  setResponse,
  isError,
}: Props) {
  const { toast } = useToast();
  const copyHandler = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: "Cover Letter",
      description: "Text Copied!!",
    });
  };

  return (
    <Dialog open={isResponseGenerated} onOpenChange={setIsResponseGenerated}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="sm:w-[700px]">
        {!isError && (
          <>
            <DialogHeader className="flex flex-row w-full items-center justify-between">
              <DialogTitle>Cover Letter</DialogTitle>
            </DialogHeader>

            <Textarea
              className="w-full sm:h-[550px] h-[400px]"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            ></Textarea>

            <Button onClick={() => copyHandler()}>Copy!</Button>
          </>
        )}
        {isError && (
          <>
            <DialogHeader className="flex flex-row w-full items-center justify-between">
              <DialogTitle>Error</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Error Occured!! Please try again later.
            </DialogDescription>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
