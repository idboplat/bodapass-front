import { HomeProps } from "@/type/common";

export type Page = { title: string; number: string; Component: React.FC<HomeProps<any>> };
export type Path = Record<string, Page[]>;

export const getAllPageNm = (pathList: Path[]) => {
  return pathList.flatMap((path) => {
    return Object.values(path)
      .flat()
      .map((page) => page.number);
  });
};

export const getPage = (pathList: Path[], pageNm: string) => {
  for (const pathObj of pathList) {
    for (const key in pathObj) {
      if (Array.isArray(pathObj[key])) {
        for (const item of pathObj[key]) {
          if (item.number === pageNm) {
            return item;
          }
        }
      }
    }
  }

  return null; // 해당 number가 없는 경우 null 반환
};
