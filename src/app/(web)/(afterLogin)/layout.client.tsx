"use client";
import Header from "@/app/_component/header/Header";
import Sidebar from "@/app/_component/sidebar/Sidebar";
import { AppShell, AppShellMain } from "@mantine/core";
import css from "./layout.module.scss";
import { Session } from "next-auth";
import { ClientPath } from "./_lib/getPage";
import { useDisclosure, useHotkeys, useMediaQuery } from "@mantine/hooks";
import { theme } from "@/style/theme";
import { useApp } from "@/app/_lib/appStore";
import { useStore } from "zustand";

interface LayoutClientProps {
  clientPath: ClientPath[];
  children: React.ReactNode;
  session: Session;
}

export default function LayoutClient({ children, clientPath, session }: LayoutClientProps) {
  const store = useApp();
  const isOpend = useStore(store, (store) => store.sidebar);
  const actions = useStore(store, (store) => store.actions);

  useHotkeys([[`ctrl+\\`, () => actions.toggleSidebar()]]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 250, //비활성화
        collapsed: { mobile: !isOpend, desktop: !isOpend },
      }}
      padding="md"
    >
      <Header session={session} isShowNav={isOpend} toggleNav={() => actions.toggleSidebar()} />
      <Sidebar pathList={clientPath} session={session} />
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
