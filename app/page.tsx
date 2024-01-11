import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-[83.5vh] flex-col items-center justify-between p-24">
      <div className="relative flex flex-col mt-16 gap-20 place-items-center">
        <div className="flex flex-col items-center justify-center space-y-4 z-10">
          <h1 className="text-8xl font-black text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-br gradient-radial from-blue-500 to-blue-900">
              git-re
            </span>
          </h1>
          <p className="text-4xl font-semibold text-center">
            Let&lsquo;s make your&nbsp;
            <span className=" text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
              resume
            </span>
            &nbsp; from &nbsp;
            <span className=" text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700">
              Github
            </span>
          </p>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-8">
          <Input
            type="email"
            placeholder="Enter your username"
            className="h-12"
          />
          <Button type="submit" className="h-12">
            Generate
          </Button>
        </div>
      </div>
    </main>
  );
}
