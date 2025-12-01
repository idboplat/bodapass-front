import { useSession } from "@/libraries/auth/use-session";

export function withSession<P extends { session: Session }>(Component: React.ComponentType<P>) {
  return function WithSession(props: Omit<P, "session">) {
    const { data: session } = useSession();

    if (session === undefined) return null;
    if (session === null) return null;
    return <Component {...(props as P)} session={session} />;
  };
}
