import Resume from "@/components/Resume";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";

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
        `${process.env.NEXT_PUBLIC_URL}/api/og?username=${params.username}`,
      ],
    },
  };
}
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <div>
      <Resume />
    </div>
  );
}
