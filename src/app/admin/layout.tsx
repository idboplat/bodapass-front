import { notFound } from 'next/navigation';
import Client from './layout.client';

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: AdminLayoutProps) {
  return <Client>{children}</Client>;
}
