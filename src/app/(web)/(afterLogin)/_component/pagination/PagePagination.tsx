import classNames from "classnames";
import { wrap } from "./pagePagination.css";
import {
  MdOutlineKeyboardDoubleArrowRight as ArrowLast,
  MdOutlineKeyboardDoubleArrowLeft as ArrowFirst,
  MdKeyboardArrowRight as ArrowRight,
  MdKeyboardArrowLeft as ArrowLeft,
} from "react-icons/md";

interface PaginationProps {
  currentCount: number;
  onChange: (page: number) => void;
  /** 최대 아이템 수 */
  count: number;
  /** 페이지당 아이템 수 */
  pageSize: number;
  /**
   * Pagination 버튼 수
   */
  length: number;
}

export default function PagePagination({
  currentCount,
  count,
  pageSize,
  length,
  onChange,
}: PaginationProps) {
  const currentPage = Math.ceil(currentCount / pageSize); //현재 페이지
  const pageCount = Math.ceil(count / pageSize); //마지막 페이지
  //페이지당 데이터수
  const pagerPerLength = Math.ceil(pageCount / length);
  //현재 페이지가 몇번째 페이지 그룹에 있는지
  const skip = Math.floor((currentPage - 1) / pagerPerLength);
  //현재 페이지 그룹의 시작 페이지
  const start = skip * length + 1;

  const paginationArr = Array.from({ length }, (_, index) => {
    const num = start + index;
    return num > count ? null : num;
  });

  const onClickPage = (page: number) => onChange(page * pageSize);
  const onClickFirst = () => onChange(1);
  const onClickPrev = () => onChange(length * pageSize * (skip - 1) + pagerPerLength);
  const onClickNext = () => onChange(length * pageSize * (skip + 1) + pagerPerLength);
  const onClickLast = () => onChange(count);

  const disabledFirst = currentPage <= 1;
  const disabledPrev = start < pagerPerLength;
  const disabledNext = start + pagerPerLength > pageCount;
  const disabledLast = currentPage >= pageCount;

  return (
    <div className={wrap}>
      <button onClick={onClickFirst} disabled={disabledFirst}>
        <ArrowFirst size={24} />
      </button>
      <button onClick={onClickPrev} disabled={disabledPrev}>
        <ArrowLeft size={24} />
      </button>
      <ol>
        {paginationArr.map((num) => {
          const disabledCurrent = currentPage === num;

          if (num === null) return null;
          return (
            <li key={"pagination" + num}>
              <button
                className={classNames(disabledCurrent && "active")}
                onClick={() => onClickPage(num)}
                disabled={disabledCurrent}
              >
                {num}
              </button>
            </li>
          );
        })}
      </ol>
      <button onClick={onClickNext} disabled={disabledNext}>
        <ArrowRight size={24} />
      </button>
      <button onClick={onClickLast} disabled={disabledLast}>
        <ArrowLast size={24} />
      </button>
    </div>
  );
}
