import { EventCallbacks, Session } from "next-auth";
import callTms from "../callTms";
import { TBW_000001_P02 } from "@/type/api";

export const signOut: EventCallbacks["signOut"] = async ({ token }) => {
  try {
    await callTms<TBW_000001_P02>({
      svcId: "TBW_000001_P02",
      data: [],
      session: token as unknown as Session,
    });
  } catch (error) {
    console.error("TBW_000001_P02", error);
  }
};
