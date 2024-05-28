import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { PropsWithChildren } from "react";
import LayoutClient from "./layout.client";

export default function Layout({ children }: PropsWithChildren) {
  return <LayoutClient>{children}</LayoutClient>;
}
