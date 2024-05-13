import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Git-re OG Image";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export default async function Image(props: {
  params: {
    username: string;
  };
}) {
  const fontData = await fetch(
    new URL("/public/assets/Roboto-Bold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const italicData = await fetch(
    new URL("/public/assets/Roboto-Italic.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { username } = props.params;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background:
            "radial-gradient(circle, rgba(12,9,84,1) 0%, rgba(5,9,17,1) 100%, rgba(162,33,242,1) 100%, rgba(248,0,255,1) 100%)",
        }}
      >
        <p
          style={{
            fontSize: "120px",
            color: "#3066CC",
            marginBottom: "0",
            fontWeight: "bold !important",
          }}
        >
          git-re
        </p>
        <p
          style={{
            color: "#E5E5ED",
            fontSize: "45px",
            marginBottom: "0",
            fontWeight: "bold !important",
          }}
        >
          Level up your resume game with
          <span
            style={{
              color: "#3066CC",
              marginLeft: "7px",
              fontWeight: "bold",
            }}
          >
            git-re
          </span>{" "}
          ,
        </p>
        <p style={{ fontSize: "45px", color: "#E5E5ED", marginTop: "0" }}>
          Just like{" "}
          <span
            style={{
              marginRight: "12px",
              marginLeft: "12px",
              fontFamily: "italic",
            }}
          >
            {username}
          </span>
          did. Get started now!
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Typewriter",
          data: fontData,
          style: "normal",
        },
        {
          name: "italic",
          data: italicData,
          style: "normal",
        },
      ],
    }
  );
}
