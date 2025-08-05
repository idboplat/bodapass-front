import { useSession } from "@/libraries/auth/use-session";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Session({ children, fallback }: Props) {
  const { data: session } = useSession();

  if (session === undefined) return <>{fallback}</>;
  return <>{children}</>;
}
