import { sendMessageToDevice } from "@/hooks/use-device-api";

export const nativeLogger = (log: string) => {
  if (window.ReactNativeWebView) {
    sendMessageToDevice({
      type: "nativeLogger",
      payload: log,
    });
  } else {
    console.log("[NATIVE LOG]", log);
  }
};
