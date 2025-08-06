import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

/* 세션이 있으면 Home_PATH으로 리다이렉트 */
export function UnAuthorized({ children, fallback }: Props) {
  const router = useRouter();
  const locale = router.query.locale;
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      router.replace(`/${locale}`);
    }
  }, [session, router, locale]);

  if (session === undefined) return <>{fallback}</>;
  if (session !== null) return null;
  return <>{children}</>;
}
