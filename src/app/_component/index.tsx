import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import Jotai from "./Jotai";
import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";
import { getServerSessionWithOptions } from "@/model/nextAuth";
import App from "./App";

const ModalContainer = dynamic(() => import("./modal/ModalContainer"), { ssr: false });

export default async function Configs({ children }: PropsWithChildren) {
  const session = await getServerSessionWithOptions();

  return (
    <App session={session}>
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
    </App>
  );
}
