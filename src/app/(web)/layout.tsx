import Nav from "@/components/common/header/Nav";
import AmplifyProvider from "@/libraries/aws/amplify";
import { PropsWithChildren } from "react";
import "@/styles/amplify/core.scss";

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
