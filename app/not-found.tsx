import Link from "next/link";

const NotFound = () => {
  return (
    <main className="text-center mt-28">
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-6">
  <div className="animate-fade-in">
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="h-32 w-32 text-gray-400 dark:text-gray-600"
    >
      <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"></path>
      <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"></path>
      <path d="m11 7-3 5h4l-3 5"></path>
      <line x1="22" x2="22" y1="11" y2="13"></line>
    </svg>
  </div>
  <div className="space-y-2 text-center animate-fade-in-up">
    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Oops! Page not found.</h1>
    <p className="max-w-md text-gray-500 dark:text-gray-400">
      The page you're looking for doesn't exist or has been moved. Let's get you back on track.
    </p>
    <Link
      className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      href="/"
    >
      Go to Home
    </Link>
  </div>
</div>
    </main>
  );
};

export default NotFound;
