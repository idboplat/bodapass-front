"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import callTms from "@/libraries/callTms";
import { Session } from "next-auth";
import { TBW_001000_Q03 } from "@/types/api";
import Badge from "./Badge";
import { NavLink } from "@mantine/core";
import css from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";

interface SidebarMenuItemProps {
  icon?: React.ReactNode;
  text: string;
  href: string;
  session: Session;
}

export default function SidebarMenuItem({ icon, text, href, session }: SidebarMenuItemProps) {
  const path = usePathname();
  const isActive = path === href;

  const { data } = useQuery({
    queryKey: ["TBW_001000_Q03"],
    queryFn: async () => {
      const TBW_001000_Q03Res = await callTms<TBW_001000_Q03>({
        svcId: "TBW_001000_Q03",
        data: [session.user.corpCd],
        session,
      });

      const TBW_001000_Q03Data = TBW_001000_Q03Res.svcRspnData;
      if (!TBW_001000_Q03Data) {
        throw new Error("TBW_001000_Q03 데이터가 없습니다.");
      }

      const data: Record<string, boolean> = {
        "당사 입금 신청 내역": TBW_001000_Q03Data[0].F01 === "Y",
        "위탁 입금 신청 내역": TBW_001000_Q03Data[0].F02 === "Y",
        "고객 입출금 신청 내역": TBW_001000_Q03Data[0].F03 === "Y",
      };
      return data;
    },
  });

  return (
    <NavLink
      classNames={{
        root: css.link,
      }}
      styles={{
        label: {
          position: "relative",
        },
      }}
      active={isActive}
      component={Link}
      href={href}
      label={
        <>
          {text}
          {data?.[text] && <Badge />}
        </>
      }
      leftSection={icon}
    />
  );
}
