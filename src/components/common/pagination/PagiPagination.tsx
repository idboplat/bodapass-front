import { clsx } from "clsx";
import css from "./PagiPagination.module.scss";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  onChange: (page: number) => void;
  /** 최대 아이템 수 */
  totalCnt: number;
  /** 페이지당 아이템 수
   *  @default - 20
   */
  pgSize?: number;
  /**
   * Pagination 버튼 수
   * @default - 10
   */
  groupSize?: number;
}

export default function PagePagination({
  currentPage,
  totalCnt,
  pgSize = 15,
  groupSize = 10,
  onChange,
}: PaginationProps) {
  const maxPage = Math.ceil(totalCnt / pgSize); //마지막 페이지

  //현재 페이지 그룹이 몇번째 그룹인지
  const skip = Math.floor(currentPage / groupSize - 0.01);
  //현재 페이지 그룹의 시작 페이지
  const start = skip * groupSize + 1;

  const paginationArr = Array.from({ length: groupSize }, (_, index) => {
    const num = start + index;
    // 첫 페이지는 무조건 보여준다.
    if (num === 1) return 1;
    // 마지막 페이지를 넘어가면 null
    return num > maxPage ? null : num;
  });

  const onClickPage = (page: number) => onChange(page);
  const onClickFirst = () => onChange(1);
  const onClickLast = () => onChange(maxPage);

  const disabledFirst = currentPage <= 1;
  const disabledPrev = 1 > start - groupSize;
  const disabledNext = start + groupSize > maxPage;
  const disabledLast = currentPage >= maxPage;

  return (
    <div className={css.wrap}>
      <button onClick={onClickFirst} disabled={disabledFirst}>
        <ChevronsLeft size={24} />
      </button>
      <button onClick={() => onClickPage(start - groupSize)} disabled={disabledPrev}>
        <ChevronLeft size={24} />
      </button>
      <ol>
        {paginationArr.map((num) => {
          const disabledCurrent = currentPage === num;
          if (num === null) return null;
          return (
            <li key={"pagination" + num}>
              <button
                className={clsx(disabledCurrent && "active")}
                onClick={() => onClickPage(num)}
                disabled={disabledCurrent}
              >
                {num}
              </button>
            </li>
          );
        })}
      </ol>
      <button onClick={() => onClickPage(start + groupSize)} disabled={disabledNext}>
        <ChevronRight size={24} />
      </button>
      <button onClick={onClickLast} disabled={disabledLast}>
        <ChevronsRight size={24} />
      </button>
    </div>
  );
}
