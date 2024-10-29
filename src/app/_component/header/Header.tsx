import { fixed, title, wrap } from "./header.css";
import dynamic from "next/dynamic";
import FiatButton from "./FiatButton";
import { Session } from "next-auth";
import { AppShellHeader, Burger, Flex, Text } from "@mantine/core";

const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

interface HeaderProps {
  session: Session;
  isShowNav: boolean;
  toggleNav: () => void;
}

export default function Header({ session, toggleNav }: HeaderProps) {
  return (
    <AppShellHeader>
      <Flex
        mx={8}
        style={(theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          color: theme.colors.dark[9],
        })}
      >
        <Flex style={{ alignItems: "center" }}>
          <Burger opened={false} onClick={toggleNav} size="sm" mr={4} />
          <Text component="h1" style={{ fontSize: 16 }}>
            Logo
          </Text>
        </Flex>
        <Flex style={{ alignItems: "center" }}>
          <SessionTime session={session} />
          <FiatButton />
        </Flex>
      </Flex>
    </AppShellHeader>
  );
}
