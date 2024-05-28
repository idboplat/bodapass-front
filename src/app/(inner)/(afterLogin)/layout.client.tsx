"use client";
import styled from "@emotion/styled";
import Sidebar from "./_component/Sidebar";
import { PropsWithChildren } from "react";
import { useSetAtom } from "jotai";
import { isSidebarToggleAtom } from "@/app/_lib/atom";
import { useHotkeys } from "react-hotkeys-hook";

const Wrap = styled.div`
  display: flex;
`;

export default function LayoutClient({ children }: PropsWithChildren) {
  const setIsSidebarToggle = useSetAtom(isSidebarToggleAtom);

  useHotkeys(`ctrl+\\`, () => setIsSidebarToggle((prev) => !prev));

  return (
    <Wrap>
      <Sidebar />
      {children}
    </Wrap>
  );
}
