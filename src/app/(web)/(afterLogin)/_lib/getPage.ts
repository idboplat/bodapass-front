import { HomeProps } from "@/type/common";

export type Page = { title: string; number: string; Component: React.FC<HomeProps<any>> };
export type Path = { category: string; pages: Page[] };
export type ClientPath = { category: string; pages: Omit<Page, "Component">[] };

export const getAllPageNm = (pathList: Path[]) => {
  return pathList.flatMap((path) => {
    return Object.values(path.pages)
      .flat()
      .map((page) => page.number);
  });
};

export const getPage = (pathList: Path[], pageNm: string) => {
  for (const path of pathList) {
    for (const page of path.pages) {
      if (page.number === pageNm) {
        return page;
      }
    }
  }

  return null; // 해당 number가 없는 경우 null 반환
};

/** component가 client에 노출되지 않도록 제거 */
export const getClientPathList = (pathList: Path[]): ClientPath[] => {
  return pathList.map((path) => {
    return {
      category: path.category,
      pages: path.pages.map((page) => {
        return { title: page.title, number: page.number };
      }),
    };
  });
};
