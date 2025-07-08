
import { PropsWithChildren } from "react";
import "@/styles/amplify/core.scss";
import "highlight.js/styles/github.css";

export default function WebLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div id="app">
        {children}
      </div>
    </>
  );
}
