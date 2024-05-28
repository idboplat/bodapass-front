import { Metadata } from "next";
import NotfoundClient from "./not-found.client";

export default function Notfound() {
  return <NotfoundClient />;
}

export const metadata: Metadata = {
  title: "404 | Not Found",
};
