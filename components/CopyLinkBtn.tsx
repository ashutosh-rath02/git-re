import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { CheckCircledIcon, CheckIcon } from "@radix-ui/react-icons";

interface CopyLinkProps {
  url: string;
  children: ReactNode;
  className: string;
}

const CopyLinkBtn: React.FC<CopyLinkProps> = ({ url, children, className }) => {
  const [isCopied, setCopied] = useState(false);

  const toClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "Link Copied Successfully!",
          description: "",
          variant: "default",
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error Copying Link",
          variant: "destructive",
        });
      });
  };
  return (
    <button onClick={toClipboard} className={cn(className, "bg-white p-3")}>
      {isCopied === true ? <CheckCircledIcon /> : children}
    </button>
  );
};

export default CopyLinkBtn;
