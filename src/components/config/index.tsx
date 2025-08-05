import App from "./App";
import ReactQuery from "./ReactQuery";
import MantineProvider from "./MantineProvider";
import DeviceMessageReceiver from "./device-message-receiver";

interface ConfigsProps {
  children: React.ReactNode;
}

export default function Configs({ children }: ConfigsProps) {
  return (
    <DeviceMessageReceiver>
      <App>
        <ReactQuery>
          <MantineProvider>{children}</MantineProvider>
        </ReactQuery>
      </App>
    </DeviceMessageReceiver>
  );
}
