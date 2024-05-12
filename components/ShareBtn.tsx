import {
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappIcon,
  WhatsappShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const ShareBtn = ({ username }: { username: string }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="flex text-foreground gap-2 items-center">
          <span>
            <Share1Icon />
          </span>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share your resume</DialogTitle>
          <DialogDescription className="flex gap-3">
            <LinkedinShareButton
              className="rounded-full"
              url={`${window.origin}/resume/${username}`}
            >
              <LinkedinIcon className="rounded-full" size={40} />
            </LinkedinShareButton>
            <WhatsappShareButton
              className="rounded-full"
              url={`${window.origin}/resume/${username}`}
            >
              <WhatsappIcon className="rounded-full" size={40} />
            </WhatsappShareButton>
            <TwitterShareButton
              className="rounded-full"
              url={`${window.origin}/resume/${username}`}
            >
              <TwitterIcon className="rounded-full" size={40} />
            </TwitterShareButton>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ShareBtn;
