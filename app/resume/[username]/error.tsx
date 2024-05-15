"use client";
import React from "react";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode: number;
  message?: string;
}

const ErrorPage = ({ statusCode, message }: ErrorProps) => {
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

ErrorPage.getInitialProps = async ({
  res,
  err,
}: NextPageContext): Promise<ErrorProps> => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;
