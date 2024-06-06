"use client";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconFolder,
  IconGitCommit,
  IconGitFork,
  IconWorld,
  IconMail,
  IconStar,
} from "@tabler/icons-react";

export function NewResume() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Dhairya Shah
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              Software Engineer
            </p>
          </div>
          <div className="prose max-w-none">
            <p>
              Experienced software engineer with a passion for building scalable
              and efficient applications. Proficient in a variety of programming
              languages and frameworks, with a strong focus on delivering
              high-quality, maintainable code.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <IconMail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <a
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                email@email.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <IconWorld className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <a
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                example.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <IconBrandGithub className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <a
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                dhairyathedev
              </a>
            </div>
            <div className="flex items-center gap-2">
              <IconBrandLinkedin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <a
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                example
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Skills
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <IconCode className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    JavaScript
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-800">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: "90%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconCode className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    React
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-800">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: "85%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconCode className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Node.js
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-800">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: "80%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconCode className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    TypeScript
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-800">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{
                        width: "75%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              GitHub Stats
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <IconStar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Stars
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    1,234
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconGitFork className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Forks
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    456
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconGitCommit className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Commits
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    2,345
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <IconFolder className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    Repositories
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    78
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Contribution Graph
              </h2>
              <div className="mt-4 w-full h-full">
                <BarChartComponent className="aspect-[4/3]" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Key Repositories
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    <a className="hover:underline" href="#">
                      React UI Library
                    </a>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    A collection of reusable React components for building
                    modern web applications.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IconStar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    456
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    <a className="hover:underline" href="#">
                      Serverless API
                    </a>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    A serverless API built with Node.js, AWS Lambda, and
                    DynamoDB.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IconStar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    234
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    <a className="hover:underline" href="#">
                      Next.js Blog
                    </a>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    A blog built with Next.js, Markdown, and Tailwind CSS.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IconStar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    123
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function BarChartComponent(props: any) {
  return (
    <BarChart width={350} height={250} data={data}>
      <Bar dataKey="uv" fill="#3b82f6" />
    </BarChart>
  );
}
