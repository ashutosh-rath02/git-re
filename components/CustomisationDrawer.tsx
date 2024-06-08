import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { IconCubeUnfolded } from "@tabler/icons-react";

type CustomisationDrawerProps = {
  contributions: number;
  setContributions: (count: number) => void;
  organisations: number;
  setOrganisations: (count: number) => void;
  isContributionsExists: boolean;
  isOrganisationsExists: boolean;
};

const CustomisationDrawer: React.FC<CustomisationDrawerProps> = ({
  contributions,
  setContributions,
  organisations,
  setOrganisations,
  isContributionsExists,
  isOrganisationsExists,
}) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <IconCubeUnfolded className="h-5 w-5 mr-2" />
            Customize Resume
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Resume Customization</DrawerTitle>
              <DrawerDescription>
                Customize how your resume is generated
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 mb-4">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() =>
                    setContributions(Math.max(1, contributions - 1))
                  }
                  disabled={!isContributionsExists}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {contributions}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground ">
                    Contributions
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setContributions(contributions + 1)}
                  disabled={!isContributionsExists}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() =>
                    setOrganisations(Math.max(1, organisations - 1))
                  }
                  disabled={!isOrganisationsExists}
                >
                  <MinusIcon className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center mt-8">
                  <div className="text-7xl font-bold tracking-tighter">
                    {organisations}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    ORGANISATIONS
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => setOrganisations(organisations + 1)}
                  disabled={!isOrganisationsExists}
                >
                  <PlusIcon className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CustomisationDrawer;
