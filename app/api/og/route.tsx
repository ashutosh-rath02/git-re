import { ImageResponse } from "@vercel/og";
import Image from "next/image";
export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams, protocol, host } = new URL(request.url);

    const hasTitle = searchParams.has("username");
    const title = hasTitle
      ? searchParams.get("username")?.slice(0, 100)
      : "My website";

    const coverUrl = `${protocol}//${host}/_next/image?url=${encodeURIComponent(
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1707138008/Screenshot_2024-02-05_182909_kajlun.png"
    )}&w=1200&q=75`;
    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <span>Github username: </span>
          {title}
          <img src={coverUrl} alt="logo" className="w-full h-full" />
        </div>
      )
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
