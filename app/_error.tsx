// app/error.tsx
import React from "react";

interface ErrorProps {
  statusCode: number;
  message?: string;
}

const ErrorPage: React.FC<ErrorProps> = ({ statusCode, message }) => {
  let errorMessage = message || "An error occurred";

  if (statusCode === 404) {
    errorMessage = "Page not found";
  } else if (statusCode === 403) {
    errorMessage = "Access denied";
  } else if (statusCode === 429) {
    errorMessage = "API rate limit exceeded";
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl text-red-500">{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
