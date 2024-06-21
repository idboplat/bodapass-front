import { getServerSessionWithOptions } from "@/model/nextAuth";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import App from "./App";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";
import ToastBox from "./ToastBox";

const ModalContainer = dynamic(() => import("../modal/ModalContainer"), { ssr: false });

export default async function Configs({ children }: PropsWithChildren) {
  const session = await getServerSessionWithOptions();

  return (
    <App session={session}>
      <NextAuth>
        <Hotkeys>
          <ReactQuery>
            {children}
            <Devtools />
            <ModalContainer />
            <ToastBox />
          </ReactQuery>
        </Hotkeys>
      </NextAuth>
    </App>
  );
}
