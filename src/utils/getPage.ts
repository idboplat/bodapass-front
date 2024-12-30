import { HomeProps as PageProps } from "@/types/common";
import { ComponentType } from "react";

export type TPage = {
  title: string;
  description: string;
  pid: string; // page id
  Component: ComponentType<PageProps<any>>;
};

/**
 * path는 중첩되지 않는걸 전제로 설계 되어있음
 *
 * 추후 알림 갯수를 뱃지로 보여줘야 함.
 */
export type TPath = {
  category: string;
  icons: { default: string; hover: string };
  pages: TPage[];
};

export type TClientPath = Omit<TPath, "pages"> & { pages: Omit<TPage, "Component">[] };

/** 모든 페이지 번호를 가져온다 */
export const getAllPageNm = (pathList: TPath[]) => {
  let result: string[] = [];

  function traversePages(pages: (TPage | TPath)[]): void {
    for (const page of pages) {
      if ("category" in page) {
        traversePages(page.pages);
      } else {
        result.push(page.pid);
      }
    }
  }

  traversePages(pathList);
  return result;
};

/** 페이지 번호에 해당하는 페이지 정보 조회 */
export const getPage = (pathList: (TPath | TPage)[], pid: string): TPage | null => {
  let result: TPage | null = null;

  function traversePages(pages: (TPath | TPage)[]): void {
    for (const page of pages) {
      if ("category" in page) {
        traversePages(page.pages);
      } else if (page.pid === pid) {
        result = page;
      }
    }
  }

  traversePages(pathList);
  return result;
};

/** component가 client에 노출되지 않도록 제거 */
export const getClientPathList = (paths: TPath[]) => {
  let result: TClientPath[] = [];

  function traversePages(pages: (TPage | TPath)[]) {
    let temp: TClientPath["pages"] = [];

    for (const page of pages) {
      if ("category" in page) {
        const pages = traversePages(page.pages);
        result.push({ ...page, pages });
      } else {
        const { Component, ...props } = page;
        temp.push({ ...props });
      }
    }

    return temp;
  }

  traversePages(paths);
  return result;
};
