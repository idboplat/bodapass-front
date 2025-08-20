import { PropsWithChildren, useEffect } from "react";
import { logger } from "@/apis/logger";
import { TDeviceMessageData, WATING_MESSSAGE_MAP } from "@/hooks/use-device-api";
import { APP_ORIGIN } from "@/constants";

export default function DeviceMessageReceiver({ children }: PropsWithChildren) {
  useEffect(() => {
    const listener = async (event: MessageEvent) => {
      try {
        const data: TDeviceMessageData<unknown> = JSON.parse(event.data);

        if (data.origin !== APP_ORIGIN) return;

        const item = WATING_MESSSAGE_MAP.get(data.type);

        if (item) {
          clearTimeout(item.timer);
          WATING_MESSSAGE_MAP.delete(data.type);
          item.resolve(data.payload);
        } else {
          switch (data.type) {
            default:
              console.log("unknown message type", data.type);
          }
        }
      } catch (error) {
        await logger("error === ");
        await logger(error instanceof Error ? error.message : String(error));
      }
    };

    window.addEventListener("message", listener); // IOS
    document.addEventListener("message", listener); // Android
    return () => {
      window.removeEventListener("message", listener); // IOS
      document.removeEventListener("message", listener); // Android
    };
  }, []);

  return <>{children}</>;
}
