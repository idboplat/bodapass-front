import { format } from "date-fns";
import { RowData } from "@/constants/b2c/row.type";
import css from "./ApproveView.module.scss";

interface ApproveViewProps {
  data: RowData;
}

export default function ApproveView({ data }: ApproveViewProps) {
  return (
    <div className={css.wrap}>
      <div className={css.row}>
        <div className={css.label}>일자</div>
        <div className={css.text}>{data["입출고 일자"]}</div>
      </div>
      <div className={css.row}>
        <div className={css.label}>일련번호</div>
        <div className={css.text} style={{ textAlign: "right" }}>
          {data["입출고 일련번호"]}
        </div>
      </div>
      <div className={css.row}>
        <div className={css.label}>사용자 ID</div>
        <div className={css.text}>{data["사용자 ID"]}</div>
      </div>
      <div className={css.row}>
        <div className={css.label}>종목 코드</div>
        <div className={css.text}>{data.종목}</div>
      </div>
      <div className={css.row}>
        <div className={css.label}>입출 구분</div>
        <div className={css.text}>{data["입/출"]}</div>
      </div>
      <div className={css.row}>
        <div className={css.label}>수량</div>
        <div className={css.text} style={{ textAlign: "right" }}>
          {data.수량}
        </div>
      </div>
      <div className={css.row}>
        <div className={css.label}>작업인</div>
        <div className={css.text}>{data.신청인}</div>
      </div>
      <div className={css.row}>
        <div className={css.label}>생성 일시</div>
        <div className={css.text}>{data["신청 일시"]}</div>
      </div>
    </div>
  );
}
