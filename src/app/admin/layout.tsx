import Client from "./layout.client";
import "@/styles/agGrid.scss";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  return <Client>{children}</Client>;
}
