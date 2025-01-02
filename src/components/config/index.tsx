import { getServerSessionWithOptions } from "@/libraries/nextAuth";
import App from "./App";
import Devtools from "./Devtools";
import NextAuth from "./NextAuth";
import ReactQuery from "./ReactQuery";
import ToastBox from "./ToastBox";
import { cookies } from "next/headers";
import MantineProvider from "./MantineProvider";
import ModalContainer from "../common/modal/ModalContainer";

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
      <NextAuth session={session}>
        <ReactQuery>
          <MantineProvider defaultColorScheme={"light"}>
            {children}
            {/* <Devtools /> */}
            <ModalContainer />
            <ToastBox />
          </MantineProvider>
        </ReactQuery>
      </NextAuth>
    </App>
  );
}
