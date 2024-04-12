/* eslint-disable @next/next/no-img-element */
// "use client";
import React from "react";
import "./globals.css";
import Form from "@/components/Form";
import AuthButton from "@/components/AuthButton";
import { supabaseServer } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="flex min-h-[83vh] flex-col items-center justify-center p-4 lg:px-24">
      <div className="relative flex flex-col w-full max-w-4xl gap-8 place-items-center">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 pointer-events-none">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
              git-re
            </span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-4xl font-semibold">
            Elevate your&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
              GitHub
            </span>
            &nbsp;to a dynamic&nbsp;
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
              resume
            </span>
            &nbsp;effortlessly.
          </p>
        </div>
        {data.user ? <Form /> : <AuthButton user={data.user} />}

        <a
          href="https://www.producthunt.com/posts/git-re?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-git&#0045;re"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=438558&theme=light"
            alt="git&#0045;re - Elevate&#0032;your&#0032;GitHub&#0032;to&#0032;a&#0032;dynamic&#0032;resume&#0032;effortlessly | Product Hunt"
            style={{ width: "200px", height: "50px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </main>
  );
}
