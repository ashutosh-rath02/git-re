import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import Script from 'next/script';

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
  metadataBase: new URL(new URL(process.env.NEXT_PUBLIC_URL!)),
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
          <NextTopLoader showSpinner={false} color="#3b82f6" />
          <div className="flex flex-col min-h-[100vh] overflow-x-hidden">
            <Navbar />
            <div className="grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <Toaster />
        <SpeedInsights />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function(){
              var s1 = document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/66891af8eaf3bd8d4d18ca2d/1i24gr9s5';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
