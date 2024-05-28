import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "@emotion/styled";
import { HiChevronDoubleLeft, HiMiniUserGroup } from "react-icons/hi2";
import { MdUnsubscribe } from "react-icons/md";
import { useAtom } from "jotai";
import { isSidebarToggleAtom } from "@/app/_lib/atom";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const Wrap = styled.div<{ isSidebarToggle: boolean }>`
  position: relative;
  width: ${({ isSidebarToggle }) => (isSidebarToggle ? "calc(240px - 240px)" : "240px")};
  height: 100dvh;
  transition: width 0.3s ease;
  background: #f7f7f5;

  > div:nth-of-type(1):hover + div:nth-of-type(2) {
    opacity: 1;
    z-index: 100;
  }

  div:nth-of-type(3),
  div:nth-of-type(4) {
    margin-left: ${({ isSidebarToggle }) => (isSidebarToggle ? "-240px" : "0px")};
  }
`;

const ContentWrap = styled.div`
  width: 240px;
  padding: 6px 4px;
  transition: margin-left 0.3s ease;
`;

const SidebarToggle = styled.div<{ isSidebarToggle: boolean }>`
  position: absolute;
  top: 10px;
  right: ${({ isSidebarToggle }) => (isSidebarToggle ? "-40" : "10")}px;
  width: 26px;
  height: 26px;
  padding: 4px;

  transform: ${({ isSidebarToggle }) => (isSidebarToggle ? "rotateY(180deg)" : "rotateY(0deg)")};
  &:hover {
    cursor: pointer;
    background: #f0f0ec;
    border-radius: 2px;
  }

  > svg {
    color: #666666;
    width: 100%;
    height: 100%;
  }
`;

const SidebarToggleGuideModal = styled.div<{ isSidebarToggle: boolean }>`
  position: absolute;
  top: 40px;
  right: ${({ isSidebarToggle }) => (isSidebarToggle ? "-110" : "10")}px;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: -1;

  padding: 6px 10px;
  background: #3d3d3d;
  border-radius: 4px;

  font-size: 13px;
  > p {
    color: #eeeeee;
  }
  > span {
    color: #a8a8a8;
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 400;
  padding: 4px 10px;
`;

const Menu = styled.ul``;

const MenuItem = styled.li<{ isSelected: boolean }>`
  padding: 6px 10px;
  font-size: 16px;
  font-weight: 400;
  color: ${({ isSelected }) => (isSelected ? "#242424" : "#9b9b9b")};

  > a {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &:hover {
    cursor: pointer;
    background: #f0f0ec;
    transition: background 0.2s ease;
    border-radius: 2px;
  }
`;

const LogoutBox = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #9b9b9b;
  cursor: pointer;

  &:hover {
    color: #242424;
  }
`;

export default function Sidebar() {
  const [isSidebarToggle, setIsSidebarToggle] = useAtom(isSidebarToggleAtom);

  const pathName = usePathname();

  const mutateLogout = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      await signOut({ redirect: true, callbackUrl: "/login" });
    },
  });

  return (
    <Wrap isSidebarToggle={isSidebarToggle}>
      <SidebarToggle
        isSidebarToggle={isSidebarToggle}
        onClick={() => setIsSidebarToggle((prev) => !prev)}
      >
        <HiChevronDoubleLeft />
      </SidebarToggle>
      <SidebarToggleGuideModal isSidebarToggle={isSidebarToggle}>
        <p>사이드바 닫기</p> <span>ctrl + \</span>
      </SidebarToggleGuideModal>

      <ContentWrap>
        <Title>TPRO</Title>
        <Menu>
          <MenuItem isSelected={pathName === "/user"}>
            <Link href="/user">
              <HiMiniUserGroup />
              <span>회원정보</span>
            </Link>
          </MenuItem>
          <MenuItem isSelected={pathName === "/subscribe"}>
            <Link href="/subscribe">
              <MdUnsubscribe />
              <span>구독정보</span>
            </Link>
          </MenuItem>
        </Menu>
      </ContentWrap>

      <LogoutBox>
        <button onClick={() => mutateLogout.mutate()} disabled={mutateLogout.isPending}>
          로그아웃
        </button>
      </LogoutBox>
    </Wrap>
  );
}
