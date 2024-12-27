//"use client"
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { ClientPath } from "@/utils/getPage";
import Image from "next/image";

import logo from "@/assets/images/logo.png";
import iconCate1 from "@/assets/images/icon_header_cate_01.png";
import iconCate1On from "@/assets/images/icon_header_cate_on_01.png";
import iconCate2 from "@/assets/images/icon_header_cate_02.png";
import iconCate2On from "@/assets/images/icon_header_cate_on_02.png";
import iconCate3 from "@/assets/images/icon_header_cate_03.png";
import iconCate3On from "@/assets/images/icon_header_cate_on_03.png";
import iconCate4 from "@/assets/images/icon_header_cate_04.png";
import iconCate4On from "@/assets/images/icon_header_cate_on_04.png";
import iconCate5 from "@/assets/images/icon_header_cate_05.png";
import iconCate5On from "@/assets/images/icon_header_cate_on_05.png";
import iconCate6 from "@/assets/images/icon_header_cate_06.png";
import iconCate6On from "@/assets/images/icon_header_cate_on_06.png";
import iconCate7 from "@/assets/images/icon_header_cate_07.png";
import iconCate7On from "@/assets/images/icon_header_cate_on_07.png";
import iconCate8 from "@/assets/images/icon_header_cate_08.png";
import iconCate8On from "@/assets/images/icon_header_cate_on_08.png";
import iconCate9 from "@/assets/images/icon_header_cate_09.png";
import iconCate9On from "@/assets/images/icon_header_cate_on_09.png";
import css from "./Sidebar.module.scss";
import { NavLink } from "@mantine/core";

// const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

interface SidebarProps {
  session: Session;
  pathList: ClientPath[];
  handleSubmit: (pageNumber: string) => void;
}

export default function Sidebar({ session, pathList, handleSubmit }: SidebarProps) {
  const [indexCategory, setIndexCategory] = useState(0);
  const [indexMarket, setIndexMarket] = useState(1);
  const [indexOrder, setIndexOrder] = useState(0);
  const [indexAgent, setIndexAgent] = useState(0);
  const [indexStatistic, setIndexStatistic] = useState(0);

  // 큰 카테고리.
  function handleSubmitCate(params: number) {
    setIndexCategory(params);

    var pathContent: string = "";
    switch (params) {
      case 0:
        pathContent = `100101`;
        break;
      case 1:
        pathContent = `100201`;
        break;
      case 2:
        handleSubmitMarket(indexMarket);
        return;
      case 3:
        pathContent = `100401`;
        break;
      case 4:
        handleSubmitAgent(indexAgent);
        return;
      case 5:
        pathContent = `100601`;
        break;
      case 6:
        handleSubmitStatistic(indexStatistic);
        return;
      case 7:
        pathContent = `100801`;
        break;
      case 8:
        pathContent = `100901`;
        break;
      default:
        break;
    }

    handleSubmit(pathContent);
  }

  // 유저.마켓
  function handleSubmitMarket(params: number) {
    setIndexMarket(params);

    var pathContent: string = "";
    switch (params) {
      case 0:
        pathContent = `100301`;
        break;
      case 1:
        pathContent = `100302`;
        break;
      case 2:
        pathContent = `100303`;
        break;
      case 3:
        pathContent = `100304`;
        break;
      // case 4: pathContent= `100305`; break;
      // case 5: pathContent= `100306`; break;
      // case 6: pathContent= `100307`; break;
      // case 7: pathContent= `100308`; break;
      default:
        break;
    }

    handleSubmit(pathContent);
  }

  // 주문
  function handleSubmitOrder(params: number) {
    setIndexOrder(params);

    var pathContent: string = "";
    switch (params) {
      case 0:
        pathContent = `100401`;
        break;
      case 1:
        pathContent = `100402`;
        break;
      case 2:
        pathContent = `100403`;
        break;
      case 3:
        pathContent = `100404`;
        break;
      case 4:
        pathContent = `100405`;
        break;
      // case 5: pathContent= `100306`; break;
      // case 6: pathContent= `100307`; break;
      // case 7: pathContent= `100308`; break;
      default:
        break;
    }

    handleSubmit(pathContent);
  }

  // 에이전트
  function handleSubmitAgent(params: number) {
    setIndexAgent(params);

    var pathContent: string = "";
    switch (params) {
      case 0:
        pathContent = `100501`;
        break;
      case 1:
        pathContent = `100502`;
        break;
      case 2:
        pathContent = `100503`;
        break;
      default:
        break;
    }

    handleSubmit(pathContent);
  }

  // 통계
  function handleSubmitStatistic(params: number) {
    setIndexStatistic(params);

    var pathContent: string = "";
    switch (params) {
      case 0:
        pathContent = `100701`;
        break;
      case 1:
        pathContent = `100702`;
        break;
      case 2:
        pathContent = `100703`;
        break;
      case 3:
        pathContent = `100704`;
        break;
      default:
        break;
    }

    handleSubmit(pathContent);
  }

  return (
    <aside className={css.sidebar}>
      <div>
        <a className={css.logo}>
          <h1>
            <Image src={logo.src} alt="BIT WAVE" width={127} height={24} />
          </h1>
        </a>
      </div>
      <nav className={css.nav}>
        <ul>
          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="대시보드"
              active={indexCategory === 0}
              onClick={() => handleSubmitCate(0)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate1.src})`,
                  "--bg-image-active": `url(${iconCate1On.src})`,
                },
              }}
            />
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="마이페이지"
              active={indexCategory === 1}
              onClick={() => handleSubmitCate(1)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate2.src})`,
                  "--bg-image-active": `url(${iconCate2On.src})`,
                },
              }}
            />
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="유저/마켓관리"
              active={indexCategory === 2}
              onClick={() => handleSubmitCate(2)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate3.src})`,
                  "--bg-image-active": `url(${iconCate3On.src})`,
                },
              }}
            >
              <dl>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="유저 목록"
                    active={indexMarket === 1}
                    onClick={() => handleSubmitMarket(1)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="출금 내역"
                    active={indexMarket === 2}
                    onClick={() => handleSubmitMarket(2)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="마켓 목록"
                    active={indexMarket === 3}
                    onClick={() => handleSubmitMarket(3)}
                  />
                </dd>
              </dl>
            </NavLink>
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="주문"
              active={indexCategory === 3}
              onClick={() => handleSubmitCate(3)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate3.src})`,
                  "--bg-image-active": `url(${iconCate3On.src})`,
                },
              }}
            >
              <dl>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="포지션 내역"
                    active={indexOrder === 0}
                    onClick={() => handleSubmitOrder(0)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="미체결 내역"
                    active={indexOrder === 1}
                    onClick={() => handleSubmitOrder(1)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="주문 내역"
                    active={indexOrder === 2}
                    onClick={() => handleSubmitOrder(2)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="체결 내역"
                    active={indexOrder === 3}
                    onClick={() => handleSubmitOrder(3)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="고객 손익 내역"
                    active={indexOrder === 4}
                    onClick={() => handleSubmitOrder(4)}
                  />
                </dd>
              </dl>
            </NavLink>
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="에이전트 관리"
              active={indexCategory === 4}
              onClick={() => handleSubmitCate(4)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate5.src})`,
                  "--bg-image-active": `url(${iconCate5On.src})`,
                },
              }}
            >
              <dl>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="에이전트 내역"
                    active={indexAgent === 0}
                    onClick={() => handleSubmitAgent(0)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="에이전트 목록"
                    active={indexAgent === 1}
                    onClick={() => handleSubmitAgent(1)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="에이전트 생성"
                    active={indexAgent === 2}
                    onClick={() => handleSubmitAgent(2)}
                  />
                </dd>
              </dl>
            </NavLink>
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="입금/출금"
              active={indexCategory === 5}
              onClick={() => handleSubmitCate(5)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate6.src})`,
                  "--bg-image-active": `url(${iconCate6On.src})`,
                },
              }}
            />
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="통계"
              active={indexCategory === 6}
              onClick={() => handleSubmitCate(6)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate7.src})`,
                  "--bg-image-active": `url(${iconCate7On.src})`,
                },
              }}
            >
              <dl>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="정산관리"
                    active={indexStatistic === 0}
                    onClick={() => handleSubmitStatistic(0)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="에이전트 수익 통계"
                    active={indexStatistic === 1}
                    onClick={() => handleSubmitStatistic(1)}
                  />
                </dd>
                <dd>
                  <NavLink
                    classNames={{ root: css.navItem }}
                    component="a"
                    label="하부 에이전트 수익 통계"
                    active={indexStatistic === 2}
                    onClick={() => handleSubmitStatistic(2)}
                  />
                </dd>
              </dl>
            </NavLink>
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="개발자"
              active={indexCategory === 7}
              onClick={() => handleSubmitCate(7)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate8.src})`,
                  "--bg-image-active": `url(${iconCate8On.src})`,
                },
              }}
            />
          </li>

          <li>
            <NavLink
              classNames={{ root: css.navHeader }}
              component="a"
              label="관리자"
              active={indexCategory === 8}
              onClick={() => handleSubmitCate(8)}
              styles={{
                root: {
                  "--bg-image": `url(${iconCate9.src})`,
                  "--bg-image-active": `url(${iconCate9On.src})`,
                },
              }}
            />
          </li>
        </ul>
      </nav>
    </aside>
  );
}
