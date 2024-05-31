import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import Jotai from "./Jotai";
import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";

const ModalContainer = dynamic(() => import("./modal/ModalContainer"), { ssr: false });

export default function Configs({ children }: PropsWithChildren) {
  return (
    <NextAuth>
      <Jotai>
        <Hotkeys>
          <ReactQuery>
            {children}
            <Devtools />
            <ModalContainer />
            <Toaster />
          </ReactQuery>
        </Hotkeys>
      </Jotai>
    </NextAuth>
  );
}
