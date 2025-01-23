import App from "./App";
import Devtools from "./Devtools";
import ReactQuery from "./ReactQuery";
import ToastBox from "./ToastBox";
import { cookies } from "next/headers";
import MantineProvider from "./MantineProvider";
import ModalContainer from "../common/modal/ModalContainer";
import {getServerSession} from '@/libraries/auth/auth.service';
import Nav from '../common/header/Nav';

interface ConfigsProps {
  defaultColorScheme: "light" | "dark";
  children: React.ReactNode;
}

export default async function Configs({ children, defaultColorScheme }: ConfigsProps) {
  const cookieStore = await cookies();
  const sidebar = cookieStore.get("sidebar")?.value !== "false";
  const fiat = cookieStore.get("fiat")?.value as string | undefined;
  const session = await getServerSession();

  return (
    <App session={session} sidebar={sidebar} fiat={fiat || "KRW"}>
      <ReactQuery>
        <MantineProvider defaultColorScheme={"light"}>         
            {children}
          {/* <Devtools /> */}
          <ModalContainer />
          <ToastBox />
        </MantineProvider>
      </ReactQuery>
    </App>
  );
}
