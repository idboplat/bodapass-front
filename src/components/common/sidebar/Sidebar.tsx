"use client";
import { TClientPath } from "@/utils/getPage";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import css from "./Sidebar.module.scss";
import { NavLink } from "@mantine/core";
import { useParams } from "next/navigation";
import Link from "next/link";

// const SessionTime = dynamic(() => import("./SessionTime"), { ssr: false });

interface SidebarProps {
  session: Session;
  pathList: TClientPath[];
}

export default function Sidebar({ session, pathList }: SidebarProps) {
  const params = useParams();
  const pid = params.page as string;
  const corpGrpTp = session.corpGrpTp;

  return (
    <aside className={css.sidebar}>
      <div>
        <a className={css.logo} href="/">
          <h1>
            <Image src={logo.src} alt="BIT WAVE" width={127} height={24} />
          </h1>
        </a>
      </div>
      <nav className={css.nav}>
        <ul>
          {pathList.map((path) => {
            const isOpend = path.pages.some((page) => page.pid === pid);
            if (path.pages.length === 1) {
              const page = path.pages[0];
              return (
                <li key={path.category}>
                  <NavLink
                    classNames={{ root: css.navHeader }}
                    label={page.title}
                    active={isOpend}
                    styles={{
                      root: {
                        "--bg-image": `url(${path.icons.default})`,
                        "--bg-image-active": `url(${path.icons.hover})`,
                      },
                    }}
                    href={`/${corpGrpTp}/${page.pid}`}
                  />
                </li>
              );
            }

            return (
              <li key={path.category}>
                <NavLink
                  classNames={{ root: css.navHeader }}
                  label={path.category}
                  active={isOpend}
                  defaultOpened={isOpend}
                  styles={{
                    root: {
                      "--bg-image": `url(${path.icons.default})`,
                      "--bg-image-active": `url(${path.icons.hover})`,
                    },
                  }}
                >
                  <dl>
                    {path.pages.map((page) => {
                      return (
                        <dd key={page.title}>
                          <NavLink
                            classNames={{ root: css.navItem }}
                            component={Link}
                            href={`/${corpGrpTp}/${page.pid}`}
                            label={page.title}
                            active={page.pid === pid}
                          />
                        </dd>
                      );
                    })}
                  </dl>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
