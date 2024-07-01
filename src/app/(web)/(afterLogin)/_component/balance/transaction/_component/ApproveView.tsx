import { RowData } from "../_const/row";

interface ApproveViewProps {
  data: RowData;
}

export default function ApproveView({ data }: ApproveViewProps) {
  return (
    <div>
      <div>
        <div>일자</div>
        <div>{data.일자}</div>
      </div>
      <div>
        <div>일련번호</div>
        <div>{data.일련번호}</div>
      </div>
      <div>
        <div>종목 코드</div>
        <div>{data["종목 코드"]}</div>
      </div>
      <div>
        <div>수량</div>
        <div>{data.수량}</div>
      </div>
      <div>
        <div>작업자</div>
        <div>{data.작업자}</div>
      </div>
      <div>
        <div>생성일시</div>
        <div>{data["생성 일시"]}</div>
      </div>
    </div>
  );
}
