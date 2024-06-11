"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Devtools() {
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <>
      <ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
    </>
  );
}
