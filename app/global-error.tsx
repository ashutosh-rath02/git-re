"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <>
      <Head>
        <title>Error</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <Button asChild>
          <Link href="/">
            <a className="text-white">Home</a>
          </Link>
        </Button>
        <h2 className="text-white font-semibold text-center align-middle sm:text-md md:text-lg lg:text-2xl">
          OOPS! Something went wrong 🥲
        </h2>
        <p className="text-white text-center">{error?.message}</p>
        <button
          className="mt-4 bg-white text-black py-2 px-4 rounded"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </>
  );
}
