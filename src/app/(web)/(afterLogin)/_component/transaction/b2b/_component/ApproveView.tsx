import { RowData } from "../_const/row.type";
import { label, row, text, wrap } from "./approveView.css";

interface ApproveViewProps {
  data: RowData;
}

export default function ApproveView({ data }: ApproveViewProps) {
  return (
    <div className={wrap}>
      <div className={row}>
        <div className={label}>일자</div>
        <div className={text}>{data["입출고 일자"]}</div>
      </div>
      <div className={row}>
        <div className={label}>일련번호</div>
        <div className={text} style={{ textAlign: "right" }}>
          {data["입출고 일련번호"]}
        </div>
      </div>
      <div className={row}>
        <div className={label}>종목 코드</div>
        <div className={text}>{data["종목"]}</div>
      </div>
      <div className={row}>
        <div className={label}>입출 구분</div>
        <div className={text}>{data["입출고 구분"]}</div>
      </div>
      <div className={row}>
        <div className={label}>수량</div>
        <div className={text} style={{ textAlign: "right" }}>
          {data.수량}
        </div>
      </div>
      <div className={row}>
        <div className={label}>작업자</div>
        <div className={text}>{data["신청인"]}</div>
      </div>
      <div className={row}>
        <div className={label}>생성일시</div>
        <div className={text}>{data["신청 일시"]}</div>
      </div>
    </div>
  );
}
