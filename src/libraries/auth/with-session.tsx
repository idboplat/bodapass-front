import { useSession } from "@/libraries/auth/use-session";
import { useEffect } from "react";
import { useState } from "react";

export function withSession<P extends { session: Session }>(Component: React.ComponentType<P>) {
  return function WithSession(props: Omit<P, "session">) {
    const [isLoad, setIsLoad] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
      setIsLoad(() => true);
    }, []);

    if (isLoad === false) return null;
    if (session === undefined) return null;
    if (session === null) return null;
    return <Component {...(props as P)} session={session} />;
  };
}
