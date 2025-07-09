import App from "./App";
import Devtools from "./Devtools";
import ReactQuery from "./ReactQuery";
import ToastBox from "./ToastBox";
import { cookies } from "next/headers";
import MantineProvider from "./MantineProvider";
import { getServerSession } from "@/libraries/auth/auth.service";
import Nav from "../common/header/Nav";
import PortalModalContainer from "../common/modal/PortalModalContainer";
import AsyncModalContainer from "../common/modal/AsyncModalContainer";
import NoSSR from "../no-ssr";
import DeviceMessageReceiver from './device-message-receiver';

interface ConfigsProps {
  children: React.ReactNode;
}

export default async function Configs({ children }: ConfigsProps) {
  const cookieStore = await cookies();
  const sidebar = cookieStore.get("sidebar")?.value !== "false";
  const fiat = cookieStore.get("fiat")?.value as string | undefined;
  const session = await getServerSession();

  return (
    <DeviceMessageReceiver>
      <App session={session} sidebar={sidebar} fiat={fiat || "KRW"}>
        <ReactQuery>
          <MantineProvider>
            <NoSSR>{children}</NoSSR>
            {/* <Devtools /> */}
            <PortalModalContainer />
            <AsyncModalContainer />
            <ToastBox />
          </MantineProvider>
        </ReactQuery>
      </App>
    </DeviceMessageReceiver>
  );
}
