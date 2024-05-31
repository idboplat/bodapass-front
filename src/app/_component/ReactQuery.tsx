"use client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryCache, QueryClientProvider } from "@tanstack/react-query";
import TmsError from "@/model/error/TmsError";
import useModalStore from "@/hook/useModalStore";
import ErrorModal from "./modal/ErrorModal";
import { signOut } from "next-auth/react";

const SESSION_OUT_CODES = ["WW104", "20029"];

export default function ReactQuery({ children }: PropsWithChildren) {
  const modalStore = useModalStore();

  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        async onError(error, query) {
          const querykey = query.queryKey;
          if (querykey.includes("ignore")) return;

          if (error instanceof TmsError) {
            //TODO: TMS error code에 따른 예외처리
            const errorCode = error.errCode || "";
            if (SESSION_OUT_CODES.includes(errorCode)) {
              await signOut({ redirect: true, callbackUrl: "/sessionout" });
              return;
            }
          }

          modalStore.push(ErrorModal, {
            props: {
              error,
            },
          });
        },
      }),
      defaultOptions: {
        queries: {
          gcTime: 30 * 1000, // 30초
          staleTime: 10 * 1000, // 10초
          refetchOnWindowFocus: false,
          retry: 3,
          retryDelay: 1000 * 2,
        },
        mutations: {
          gcTime: 0,
          retry: false,
        },
      },
    });
  });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
}
