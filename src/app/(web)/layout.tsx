import Nav from "@/components/common/header/Nav";
import { PropsWithChildren } from "react";

export default function WebLayout({ children }: PropsWithChildren) {
  return (
    <div id="app">
      {children}
      <Nav />
    </div>
  );
}
