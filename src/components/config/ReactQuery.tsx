import ErrorModal from "@/components/common/modal/ErrorModal";
import { TmsError } from "@/libraries/error/TmsError";
import { useApp } from "@/stores/app";
import { useSetModalStore } from "@/stores/modal";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

const SESSION_OUT_CODES = ["WW104", "20029"];

const checkSessionOutCode = (error: TmsError) => {
  return SESSION_OUT_CODES.includes(error.errCode || "");
};

export default function ReactQuery({ children }: PropsWithChildren) {
  const modalStore = useSetModalStore();
  const action = useApp((state) => state.actions);

  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        async onError(error, query) {
          const querykey = query.queryKey;

          if (error instanceof TmsError) {
            if (checkSessionOutCode(error)) {
              //TODO: signout
              action.logout();
              window.location.href = "/sessionout";
              return;
            }
          }

          // 에러 모달을 무시하고 싶을 때 queryKey에 ignore를 추가
          if (querykey.includes("ignore")) return;

          modalStore.push(ErrorModal, { props: { error } });
        },
      }),
      defaultOptions: {
        queries: {
          gcTime: 30 * 1000, // 30초
          staleTime: 10 * 1000, // 10초
          refetchOnWindowFocus: false,
          retry: (failureCount, error) => {
            // failureCount 0부터 시작
            if (error instanceof TmsError) {
              if (checkSessionOutCode(error)) {
                // 세션에러일 경우 재시도 하지 않음
                return false;
              }
            }
            // 그 외의 경우 재시도 횟수를 3으로 설정
            return failureCount < 2;
          },
          retryDelay: 1000 * 2,
        },
        mutations: {
          gcTime: 0,
          retry: false,
          onError: async (error) => {
            if (error instanceof TmsError) {
              if (checkSessionOutCode(error)) {
                //TODO: signout
                action.logout();
                window.location.href = "/sessionout";
                return;
              }
            }

            modalStore.push(ErrorModal, { props: { error } });
          },
        },
      },
    });
  });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
}
