import { frontApi } from "@/apis/fetcher";
import { QueryFunction, useQuery, queryOptions } from "@tanstack/react-query";

export const sessionQueryKey = ["session"] as const;

const fetchSession: QueryFunction<Session | null, typeof sessionQueryKey, never> = async () => {
  const json = await frontApi
    .get<{ messasge: string; session: Session | null }>("api/auth/session", {
      credentials: "include",
    })
    .json();

  return json.session;
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
