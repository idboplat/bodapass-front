import { sessionQueryKey } from "@/libraries/auth/use-session";
import { useApp } from "@/stores/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignoutMutation = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => {
      //TODO: signout
    },
    onError: () => {
      // default error handler override
    },
    onSettled: async () => {
      // 성공하든 실패하든 로그아웃 처리
      await queryClient.resetQueries({ queryKey: [sessionQueryKey] });
      window.location.href = "/signin";
    },
  });

  return mutate;
};
