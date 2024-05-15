import Link from "next/link";

const NotFound = () => {
  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl p-5">
          Ooopss....
        </h1>
        <h2 className="text-white font-semibold text-xl md:text-2xl lg:text-3xl p-5">
          That page could not be found!
        </h2>
        <p className="text-white font-medium p-5">
          Let's take you back home
          <Link href="/">
            <a className="underline hover:text-blue-500">Home</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
