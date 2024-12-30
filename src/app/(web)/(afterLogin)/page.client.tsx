"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Client() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "loading") return;

    if (session.status === "unauthenticated") {
      router.replace("/login");
    }

    if (session.status === "authenticated") {
      const corpGrpTp = session.data.user.corpGrpTp;

      if (corpGrpTp === "G1") {
        router.replace("/G1/100101");
      }
      if (corpGrpTp === "G2") {
        router.replace("/G2/200101");
      }
      if (corpGrpTp === "G3") {
        router.replace("/G3/200101");
      }
      if (corpGrpTp === "G4") {
        router.replace("/G4/400201");
      }
    }
  }, [session, router]);

  return null;
}
