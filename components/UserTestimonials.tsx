"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import testimonials from "@/config/content/Testimonials";

const UserTestimonails = () => {
  return (
    <div className="h-[40rem] w-full relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="px-4 mx-auto text-3xl font-bold text-center mb-8 z-10 md:text-4xl">
        Hear what our Users say about{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
          git-re
        </span>
      </h2>
      <div className="flex justify-center overflow-hidden w-[100vw] md:w-full">
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
