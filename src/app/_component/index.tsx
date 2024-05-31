import { PropsWithChildren } from "react";
import NextAuth from "./NextAuth";
import Jotai from "./Jotai";
import ReactQuery from "./ReactQuery";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import ModalProvider from "./modal/ModalProvider";
import dynamic from "next/dynamic";
import { Toaster } from "sonner";

const ModalContainer = dynamic(() => import("./modal/ModalContainer"), { ssr: false });

export default function Configs({ children }: PropsWithChildren) {
  return (
    <NextAuth>
      <Jotai>
        <ModalProvider>
          <Hotkeys>
            <ReactQuery>
              {children}
              <Devtools />
              <ModalContainer />
              <Toaster />
            </ReactQuery>
          </Hotkeys>
        </ModalProvider>
      </Jotai>
    </NextAuth>
  );
}
