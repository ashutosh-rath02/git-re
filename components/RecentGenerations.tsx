"use client";
import axios from "axios";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverEffect } from "./ui/card-hover-effect";
import { useState, useEffect } from "react";
import type { UserData } from "@/types";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RecentGenerations = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<UserData[]>("/api/users");
        setUsersData(data);
      } catch (error) {
        console.error(`error fetching the data ${error}`);
      }
    };
    fetchUsers();
  }, []);

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

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[72vw] md:w-full md:max-w-6xl z-50"
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {usersData.map((item, index) => (
            <CarouselItem
              key={index}
              className="w-full md:basis-1/2 lg:basis-1/3"
            >
              <Link
                href={`/resume/${item?.username}`}
                key={item?.username}
                className="p-1"
              >
                <Card className="bg-muted grid grid-rows-[50%, 50%] dark:bg-secondary border-2 border-light p-2 shadow-lg relative">
                  <div className="text-sm leading-[1.6] overflow-hidden dark:text-gray-100 text-black font-normal h-16">
                    <p>{item.bio ? item.bio : "No bio available"}</p>
                  </div>
                  <div className="text-sm h-16 flex items-end gap-3 mt-2">
                    <Avatar className="border-2 border-blue-500">
                      <AvatarImage src={item.avatar_url} alt={item.username} />
                      <AvatarFallback>
                        {item.username?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">
                      <p className="text-black dark:text-gray-100">
                        {item?.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-[12px]">
                        {item.username}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        {usersData.length == 0 && (
          <div role="status" className="mx-auto">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default RecentGenerations;
