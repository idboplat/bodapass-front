import { getServerSessionWithOptions } from "@/model/nextAuth";
import dynamic from "next/dynamic";
import App from "./App";
import Devtools from "./Devtools";
import Hotkeys from "./Hotkeys";
import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";
import ToastBox from "./ToastBox";
import { cookies } from "next/headers";
import MantineProvider from "./MantineProvider";

const ModalContainer = dynamic(() => import("../modal/ModalContainer"), { ssr: false });

interface ConfigsProps {
  defaultColorScheme: "light" | "dark";
  children: React.ReactNode;
}

export default async function Configs({ children, defaultColorScheme }: ConfigsProps) {
  const cookieStore = cookies();
  const sidebar = cookieStore.get("sidebar")?.value !== "false";
  const fiat = cookieStore.get("fiat")?.value as string | undefined;
  const session = await getServerSessionWithOptions();

  return (
    <App session={session} sidebar={sidebar} fiat={fiat || "KRW"}>
      <NextAuth>
        <Hotkeys>
          <ReactQuery>
            <MantineProvider defaultColorScheme={defaultColorScheme}>
              {children}
              <Devtools />
              <ModalContainer />
              <ToastBox />
            </MantineProvider>
          </ReactQuery>
        </Hotkeys>
      </NextAuth>
    </App>
  );
}
