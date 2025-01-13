import { useSetApp } from "@/stores/app";
import { useMutation } from "@tanstack/react-query";

export const useLogoutMutation = () => {
  const action = useSetApp();

  const mutate = useMutation({
    mutationKey: ["signout"],
    mutationFn: async () => {
      //TODO: signout
    },
    onError: () => {
      // default error handler override
    },
    onSettled: () => {
      // 성공하든 실패하든 로그아웃 처리
      action.logout();
      window.location.href = "/signin";
    },
  });

  return mutate;
};
