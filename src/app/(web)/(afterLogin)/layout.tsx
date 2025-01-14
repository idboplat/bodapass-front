import { PropsWithChildren } from "react";
import "highlight.js/styles/github.css";

export default async function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
