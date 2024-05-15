import { cn } from "@/utils/cn";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverEffect } from "./ui/card-hover-effect";

const RecentGenerationsLoader = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  const Card = ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={cn(
          "rounded-2xl w-full p-4 bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
          className
        )}
      >
        <div className="relative z-50">
          <div className="p-4">{children}</div>
        </div>
      </div>
    );
  };

  const carouselItems = Array.from({ length: 3 }, (_, index) => (
    <CarouselItem
      key={`carousel-item-${index}`}
      className="w-full md:basis-1/2 lg:basis-1/3 sm:mx-4"
    >
      <div className="p-1">
        <Card className="bg-muted grid grid-rows-[50%, 50%] dark:bg-secondary border-2 border-light p-2 shadow-lg relative sm:w-[400px] w-[350px]">
          <div className="text-sm leading-[1.6] overflow-hidden dark:text-gray-100 text-black font-normal h-full flex flex-col space-y-4">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <div className="text-sm h-16 flex items-end gap-3 mt-2">
            <div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <div className="font-medium">
              <p className="text-black dark:text-gray-100">
                <Skeleton className="h-4 w-[250px]" />
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-[12px] mt-2">
                <Skeleton className="h-4 w-[200px]" />
              </p>
            </div>
          </div>
        </Card>
      </div>
    </CarouselItem>
  ));

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[72vw] md:w-full md:max-w-6xl z-50"
        plugins={[plugin.current]}
        suppressHydrationWarning
      >
        <CarouselContent>{carouselItems}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default RecentGenerationsLoader;
