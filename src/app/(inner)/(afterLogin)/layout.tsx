"use client";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { PropsWithChildren } from "react";
import LayoutClient from "./layout.client";
import { Toaster } from "sonner";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <LayoutClient>
      {children}
      <Toaster />
    </LayoutClient>
  );
}
