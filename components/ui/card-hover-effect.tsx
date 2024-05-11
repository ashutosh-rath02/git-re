import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { UserData } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const HoverEffect = ({
  items,
  className,
}: {
  items: UserData[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/resume/${item?.username}`}
          key={item?.username}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-blue-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="bg-muted grid grid-rows-[50%, 50%] dark:bg-secondary border-2 border-light p-2 shadow-lg relative">
            <div className="text-sm leading-[1.6] overflow-hidden dark:text-gray-100 text-black font-normal h-16">
              <p>{item.bio ? item.bio : "No bio available"}</p>
            </div>
            <div className="text-sm h-16 flex items-center gap-3 mt-2">
              <Avatar className="border-2 border-blue-500">
                <AvatarImage src={item.avatar_url} alt={item.username} />
                <AvatarFallback>{item.username?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="font-medium">
                <p className="text-black dark:text-gray-100">{item?.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-[12px]">
                  {item.username}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
