import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Redirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [to, router]);

  return null;
}
