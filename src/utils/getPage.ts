import { HomeProps } from "@/types/common";
import { ComponentType } from "react";

export type Page = {
  title: string;
  description: string;
  number: string;
  Component: ComponentType<HomeProps<any>>;
};
export type Path = { category: string; pages: (Page | Path)[] };
export type ClientPath = { category: string; pages: (Omit<Page, "Component"> | ClientPath)[] };

/** 모든 페이지 번호를 가져온다 */
export const getAllPageNm = (pathList: Path[]) => {
  let result: string[] = [];

  function traversePages(pages: (Path | Page)[]): void {
    for (const page of pages) {
      if ("category" in page) {
        traversePages(page.pages);
      } else {
        result.push(page.number);
      }
    }
  }

  traversePages(pathList);
  return result;
};

/** 페이지 번호에 해당하는 페이지 정보 조회 */
export const getPage = (pathList: (Path | Page)[], pageNm: string): Page | null => {
  let result: Page | null = null;

  function traversePages(pages: (Path | Page)[]): void {
    for (const page of pages) {
      if ("category" in page) {
        traversePages(page.pages);
      } else if (page.number === pageNm) {
        result = page;
      }
    }
  }

  traversePages(pathList);
  return result;
};

/** component가 client에 노출되지 않도록 제거 */
export const getClientPathList = (paths: Path[]) => {
  function traversePages(pages: (Page | Path)[]) {
    const result: (Omit<Page, "Component"> | ClientPath)[] = [];

    for (const page of pages) {
      if ("category" in page) {
        const pages = traversePages(page.pages);
        result.push({ category: page.category, pages });
      } else {
        const { title, description, number } = page;
        result.push({ title, description, number });
      }
    }

    return result;
  }

  return traversePages(paths) as ClientPath[];
};
