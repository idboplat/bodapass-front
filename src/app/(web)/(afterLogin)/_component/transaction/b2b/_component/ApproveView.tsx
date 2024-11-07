import { RowData } from "../_const/row.type";
import module from "./ApproveView.module.scss";

interface ApproveViewProps {
  data: RowData;
}

export default function ApproveView({ data }: ApproveViewProps) {
  return (
    <div className={module.wrap}>
      <div className={module.row}>
        <div className={module.label}>일자</div>
        <div className={module.text}>{data["입출고 일자"]}</div>
      </div>
      <div className={module.row}>
        <div className={module.label}>일련번호</div>
        <div className={module.text} style={{ textAlign: "right" }}>
          {data["입출고 일련번호"]}
        </div>
      </div>
      <div className={module.row}>
        <div className={module.label}>종목 코드</div>
        <div className={module.text}>{data["종목"]}</div>
      </div>
      <div className={module.row}>
        <div className={module.label}>입출 구분</div>
        <div className={module.text}>{data["입출고 구분"]}</div>
      </div>
      <div className={module.row}>
        <div className={module.label}>수량</div>
        <div className={module.text} style={{ textAlign: "right" }}>
          {data.수량}
        </div>
      </div>
      <div className={module.row}>
        <div className={module.label}>작업인</div>
        <div className={module.text}>{data["신청인"]}</div>
      </div>
      <div className={module.row}>
        <div className={module.label}>생성 일시</div>
        <div className={module.text}>{data["신청 일시"]}</div>
      </div>
    </div>
  );
}
