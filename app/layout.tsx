import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "git-re",
  description: "Generate your GitHub profile into a resume effortlessly.",
  generator: "Next.js",
  applicationName: "git-re",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "resume",
    "github",
    "profile",
    "generator",
    "project",
  ],
  authors: [
    { name: "Ashutosh Rath", url: "https://github.com/ashutosh-rath02" },
  ],
  creator: "Ashutosh Rath",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://git-re.vercel.app/"),
  openGraph: {
    title: "git-re",
    description: "Generate your GitHub profile into a resume effortlessly.",
    url: "https://git-re.vercel.app/",
    siteName: "git-re",
    images: [
      {
        url: "https://res.cloudinary.com/dhnkuonev/image/upload/v1707138008/Screenshot_2024-02-05_182909_kajlun.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://res.cloudinary.com/dhnkuonev/image/upload/v1707138008/Screenshot_2024-02-05_182909_kajlun.png",
        width: 1800,
        height: 1600,
        alt: "git-re",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "git-re",
    description: "Generate your GitHub profile into a resume effortlessly.",
    creator: "@v_ashu_dev",
    images: [
      "https://res.cloudinary.com/dhnkuonev/image/upload/v1707138008/Screenshot_2024-02-05_182909_kajlun.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
