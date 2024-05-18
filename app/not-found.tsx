import Link from "next/link";

const NotFound = () => {
  return (
    <main className="text-center mt-28">
      <h2 className="text-3xl p-2">There was a problem.</h2>
      <p className="p-3">We could not find the page you were looking for.</p>
      <p>
        Go back to the{" "}
        <Link href="/" className="underline hover:text-blue-500">
          Homepage
        </Link>
      </p>
    </main>
  );
};

export default NotFound;
