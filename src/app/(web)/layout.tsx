import Nav from "@/components/common/header/Nav";
import { PropsWithChildren } from "react";
import "@/styles/amplify/core.scss";

export default function WebLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div id="app">
        {children}
        <Nav />
      </div>
    </>
  );
}
