import { PropsWithChildren } from "react";
import NextAuth from "./NextAuth";
import Jotai from "./Jotai";
import ReactQuery from "./ReactQuery";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import ModalProvider from "./ModalProvider";
import Emotion from "./Emotion";
import dynamic from "next/dynamic";

const ModalContainer = dynamic(() => import("./ModalContainer"), { ssr: false });

export default function Configs({ children }: PropsWithChildren) {
  return (
    <NextAuth>
      <Emotion>
        <Jotai>
          <ModalProvider>
            <Hotkeys>
              <ReactQuery>
                {children}
                <Devtools />
                <ModalContainer />
              </ReactQuery>
            </Hotkeys>
          </ModalProvider>
        </Jotai>
      </Emotion>
    </NextAuth>
  );
}
