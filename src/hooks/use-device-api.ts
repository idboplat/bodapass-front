import { DEVICE_API } from "@/types/common";

export interface IWatingItem {
  resolve: (data: any) => void;
  reject: (error: Error) => void;
  timer: NodeJS.Timeout | null;
  timeout: number | "infinity";
}

/** id , resolve function mapper  */
export const WATING_MESSSAGE_MAP = new Map<string, IWatingItem>();

export interface TDeviceMessageData<T> {
  origin: string;
  type: string;
  payload: T;
}

/** 에러발생시 undefined로 처리 */
export const sendMessageToDevice = <T>({
  type,
  payload,
  timeout = 10000,
}: {
  type: string;
  payload: any;
  /** infinity일때 timeout 없음 */
  timeout?: number | "infinity";
}) => {
  return new Promise<T | undefined>((resolve, reject) => {
    if (!window.ReactNativeWebView) throw new Error("ReactNativeWebView is not defined");

    let timer: NodeJS.Timeout | null = null;

    if (timeout !== "infinity") {
      timer = setTimeout(() => {
        WATING_MESSSAGE_MAP.delete(type);
        resolve(undefined);
      }, timeout);
    }

    const cache = WATING_MESSSAGE_MAP.get(type);

    if (cache) {
      if (cache.timer) clearTimeout(cache.timer);
      WATING_MESSSAGE_MAP.delete(type);
      resolve(undefined);
    }

    WATING_MESSSAGE_MAP.set(type, {
      resolve,
      reject,
      timer,
      timeout,
    });

    window.ReactNativeWebView?.postMessage(JSON.stringify({ type, payload }));
  });
};

export const nativeAlert = (message: string) => {
  if (typeof window === "undefined") {
    throw new Error("window is not defined");
  }

  if (!!window.ReactNativeWebView) {
    sendMessageToDevice({
      type: DEVICE_API.nativeAlert,
      payload: message,
    });
  } else {
    alert(message);
  }
};

export const nativeLogger = (log: string) => {
  if (typeof window !== "undefined" && !!window.ReactNativeWebView) {
    sendMessageToDevice({
      type: DEVICE_API.nativeLogger,
      payload: log,
    });
  } else {
    console.log("[NATIVE LOG]", log);
  }
};
