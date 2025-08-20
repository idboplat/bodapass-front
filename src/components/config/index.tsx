import App from "./app";
import ReactQuery from "./react-query";
import MantineProvider from "./mantine-provider";
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
