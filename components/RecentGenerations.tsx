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
import RecentGenerationsLoader from "./RecetUsersLoading";

const RecentGenerations = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<UserData[]>("/api/users");
        setUsersData(data);
      } catch (error) {
        console.error(`error fetching the data ${error}`);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <RecentGenerationsLoader />;
  }

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
      </Carousel>
    </div>
  );
};

export default RecentGenerations;
