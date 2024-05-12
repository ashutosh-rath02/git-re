"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const UserTestimonails = () => {
  const testimonials = [
    {
      quote:
        "Interesting ! Is there a way to display public repositories from organizations made by the user ?",
      name: "Yannick",
      title: "Full-Stack Developer",
    },
    {
      quote:
        "The idea is very cool :) Would love to be able to export the result as a PDF I can share",
      name: "Matt El Mouktafi",
      title: "Founder @Achiev",
    },
    {
      quote: "Looks nice. Good luck to you today",
      name: "Garen Orchyan",
      title: "Building Asyncinterview",
    },
  ];

  return (
    <div className="h-[40rem] w-full relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 z-10">
        Hear our Users about{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
          git-re
        </span>
      </h2>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="fast"
          />
        </div>
      </div>
    </div>
  );
};

export default UserTestimonails;
