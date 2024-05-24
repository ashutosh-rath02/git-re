// pages/400.tsx

import Link from "next/link";

const Custom400 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">400 - Bad Request</h1>
      <p className="text-lg mb-4">
        The data could not be fetched, please reload the page or check the URL.
      </p>
      <Link href="/">
        <a className="text-blue-600 hover:underline">Go back to Home</a>
      </Link>
    </div>
  );
};

export default Custom400;
