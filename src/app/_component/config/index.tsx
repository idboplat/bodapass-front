import { getServerSessionWithOptions } from "@/model/nextAuth";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import App from "./App";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";
import ToastBox from "./ToastBox";
import { cookies } from "next/headers";

const ModalContainer = dynamic(() => import("../modal/ModalContainer"), { ssr: false });

export default async function Configs({ children }: PropsWithChildren) {
  const cookieStore = cookies();
  const sidebar = cookieStore.get("sidebar")?.value !== "false";
  const fiat = cookieStore.get("fiat")?.value as string | undefined;
  const session = await getServerSessionWithOptions();

  return (
    <App session={session} sidebar={sidebar} fiat={fiat || "KRW"}>
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
