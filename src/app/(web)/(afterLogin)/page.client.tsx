"use client";
import callTms from "@/model/callTms";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth";

export default function Client({ session }: { session: Session }) {
  const { data } = useQuery({
    queryKey: ["B9001Q"],
    queryFn: async () => {
      const B9001QRes = await callTms<any>({
        session,
        svcId: "B9001Q",
        data: [
          session.user.sessionId,
          session.user.sessionKey,
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "N",
        ],
        pgSize: 20,
      });

      return true;
    },
  });

  return <div>Client</div>;
}
