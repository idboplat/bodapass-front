import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { arrowBtn, page, wrap } from "./pagination.css";

interface PaginationProps {
  next: () => void;
  prev: () => void;
  disableNext: boolean;
  disablePrev: boolean;
  currnetPage: number;
}

export default function Pagination({
  next,
  prev,
  currnetPage,
  disableNext,
  disablePrev,
}: PaginationProps) {
  return (
    <div className={wrap}>
      <button className={arrowBtn} onClick={prev} disabled={disablePrev}>
        <MdOutlineArrowBackIos size={14} />
      </button>
      <span className={page}>{currnetPage}</span>
      <button className={arrowBtn} onClick={next} disabled={disableNext}>
        <MdOutlineArrowForwardIos size={14} />
      </button>
    </div>
  );
}
