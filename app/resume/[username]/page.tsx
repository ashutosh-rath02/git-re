import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Head from "next/head";
import { NewResume } from "@/components/new-resume";

type Props = {
  params: { username: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.username} | git-re `,
    description: `Check out ${params.username}'s resume on git-re`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL! + "/resume/"),

    openGraph: {
      url: `${process.env.NEXT_PUBLIC_URL}/resume/${params.username}`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_URL}/api/og?username=${params.username}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "git-re",
      description: `Hey, Check out my resume at ${process.env.NEXT_PUBLIC_URL}/resume/${params.username}. Want to create your's? Visit https://git-re.vercel.app/ `,
      creator: "@v_ashu_dev",
      images: [
        `${process.env.NEXT_PUBLIC_URL}api/og?username=${params.username}`,
      ],
    },
  };
}
export default async function Home({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: recent_user } = await supabase
    .from("recent_users")
    .select("*")
    .eq("username", params.username)
    .single();
  if (!user && !recent_user) {
    redirect("/");
  }
  return (
    <div className="mt-16">
      <NewResume />
    </div>
  );
}
