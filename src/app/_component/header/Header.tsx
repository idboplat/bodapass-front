import dynamic from "next/dynamic";
import FiatButton from "./FiatButton";
import { Session } from "next-auth";
import { AppShellHeader, Flex, Text, UnstyledButton, useMantineTheme } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";

const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

interface HeaderProps {
  session: Session;
  isShowNav: boolean;
  toggleNav: () => void;
}

export default function Header({ session, toggleNav }: HeaderProps) {
  const theme = useMantineTheme();

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
          <UnstyledButton mr={4} onClick={toggleNav}>
            <IconMenu2 size={24} color={theme.colors.gray[5]} />
          </UnstyledButton>
          <Text component="h1" style={{ fontSize: 16 }}>
            GLE Admin
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
