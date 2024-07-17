import React from "react";

export default function Loader() {
  return (
    <div className="flex gap-2 justify-center items-center">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-black rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-pulse"></div>
    </div>
  );
}
