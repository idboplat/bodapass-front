import { nativeLogger } from "@/hooks/use-device-api";
import { SESSION_LOCAL_STORAGE_KEY } from "@/constants";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { QueryFunction, useQuery, queryOptions } from "@tanstack/react-query";
import { DEVICE_API } from "@/types/common";

export const sessionQueryKey = ["session"] as const;

const fetchSession: QueryFunction<Session | null, typeof sessionQueryKey, never> = async () => {
  const session = await new Promise<Session | null>(async (resolve, reject) => {
    try {
      if (!!window.ReactNativeWebView) {
        const payload = await sendMessageToDevice<{
          message: string;
          session: Session | null;
        }>({
          type: DEVICE_API.getDeviceSession,
          payload: null,
        });

        resolve(payload.session);
      } else {
        // 테스트 로그인
        const session = localStorage.getItem(SESSION_LOCAL_STORAGE_KEY);
        resolve(session ? JSON.parse(session) : null);
      }
    } catch (error) {
      nativeLogger(error instanceof Error ? error.message : "Failed to fetch session");
      reject(error);
    }
  });

  return session;
};

export const sessionQueryOptions = () =>
  queryOptions({
    queryKey: sessionQueryKey,
    queryFn: fetchSession,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    gcTime: 1000 * 60 * 60 * 3, // 3 hours
  });

export const useSession = () => useQuery(sessionQueryOptions());
