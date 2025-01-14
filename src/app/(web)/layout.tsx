import Nav from "@/components/common/header/Nav";
import { PropsWithChildren } from "react";
import "@/styles/amplify/core.scss";
import AmplifyProvider from "@/libraries/aws/amplify";

export default function WebLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AmplifyProvider />
      <div id="app">
        {children}
        <Nav />
      </div>
    </>
  );
}
