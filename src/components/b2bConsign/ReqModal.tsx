import DefaultInput from "@/components/common/input/DefaultInput";
import Modal from "@/components/common/modal/Modal";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";
import modalCss from "@/components/common/modal/Modal.module.scss";
import PagiPagination from "@/components/common/pagination/PagiPagination";
import { COLUMN_STYLE } from "@/types/agGrid";
import { CORP_GRP_ITEM, findEntity } from "@/types/tp";
import { ModalProps } from "@/stores/modal";
import {
  addComma,
  convertToStandardDateTime,
  deleteIntegerZero,
  replaceToNumber,
} from "@/utils/regexp";
import callTms from "@/libraries/callTms";
import { TBW_000000_R01, TBW_000100_P01 } from "@/types/api";
import { useCorpStore } from "@/stores/corp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import classNames from "classnames";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSetTransactionCorpStore } from "@/stores/b2bConsign";
import reqModalCss from "./ReqModal.module.scss";

const ID = "reqModal";

enum ReqModalInput {
  instCd = ID + "InstCd",
  amount = ID + "Amount",
  corpNm = ID + "CorpNm",
  corpCd = ID + "CorpCd",
}

interface ReqModalProps {
  session: Session;
}

const GRID_COLS: ColDef[] = [
  {
    field: "회사 코드",
    width: 100,
    resizable: true,
    editable: true,
  },
  {
    field: "회사 명",
    width: 210,
    resizable: true,
    editable: true,
    cellStyle: COLUMN_STYLE.left,
  },
  {
    field: "회사 유형",
    width: 150,
    resizable: true,
    editable: true,
  },
];

const PAGE_SIZE = 20;

export default function ReqModal({ onClose, onSuccess, session }: ModalProps<ReqModalProps>) {
  const [instCd, setInstCd] = useState("USDL");
  const [amount, setAmount] = useState("");
  const [corpNm, setCorpNm] = useState("");
  const [corpCd, setCorpCd] = useState("");
  const [rowIndex, setRowIndex] = useState<number | null>(null);

  const [colDefs] = useState([...GRID_COLS]);
  const [total, setTotal] = useState(-1);

  const corpStore = useCorpStore();
  const actions = useSetTransactionCorpStore();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["TBW_000000_R01", corpStore],
    queryFn: async () => {
      const TBW_000000_R01Res = await callTms<TBW_000000_R01>({
        session,
        svcId: "TBW_000000_R01",
        data: [
          session.user.corpCd,
          corpStore.corpNm,
          findEntity(CORP_GRP_ITEM, corpStore.corpGrpTp)?.[0] || "",
        ],
        pgSize: PAGE_SIZE,
        pgSn: corpStore.page,
      });
      setTotal(() => TBW_000000_R01Res.svcTotRecCnt);
      const TBW_000000_R01Data = TBW_000000_R01Res.svcRspnData || [];
      return TBW_000000_R01Data;
    },
    select: (data) => {
      const result = data.map((item) => ({
        "회사 코드": item.F01,
        "회사 명": item.F02,
        "회사 유형": findEntity(CORP_GRP_ITEM, item.F03)?.[1] || "",
      }));
      return result;
    },
  });

  const rowData = data;

  const onRowClicked = (event: RowClickedEvent<Record<string, string>>) => {
    const { data } = event;
    if (!data) return;
    setRowIndex(() => rowIndex);
    setCorpNm(() => data["회사 명"]);
    setCorpCd(() => data["회사 코드"]);
  };

  const muation = useMutation({
    mutationKey: ["TBW_000100_P01"],
    mutationFn: async ({ instCd, amount }: { instCd: string; amount: string }) => {
      if (!amount || amount === "0") throw new Error("신청할 USDL 수량을 입력해주세요.");
      if (!instCd) throw new Error("종목 코드를 입력해주세요.");
      const TBW_000100_P01Res = await callTms<TBW_000100_P01>({
        session,
        svcId: "TBW_000100_P01",
        data: [corpCd, instCd, amount.replaceAll(",", "")],
      });
      const TBW_000100_P01Data = TBW_000100_P01Res.svcRspnData;
      if (TBW_000100_P01Data === null) {
        throw new Error("TBW_000100_P01Data is null");
      }
    },
    onSuccess: async () => {
      toast.success("USDL 신청이 완료되었습니다.");
      // 입금 신청 내역 재조회
      await queryClient.invalidateQueries({ queryKey: ["TBW_001000_Q03"] });
      actions.reset();
      onClose();
    },
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    switch (id) {
      case ReqModalInput.instCd:
        setInstCd(() => value);
        break;
      case ReqModalInput.amount:
        const integerStr = deleteIntegerZero(replaceToNumber(value));
        if (integerStr.length > 20) return; // 최대 20자리
        setAmount(() => addComma(integerStr));
        break;
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <div className={classNames(modalCss.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={modalCss.header}>
            <h3 className={modalCss.title}>입금 승인</h3>
          </div>
          <>
            <label htmlFor={ReqModalInput.corpNm} className={modalCss.label}>
              회사 목록
            </label>
            <div className={classNames("ag-theme-alpine", reqModalCss.tableWrap, "scroll")}>
              <AgGridReact
                columnDefs={colDefs}
                rowData={rowData}
                overlayNoRowsTemplate={"<span>데이터가 없습니다.</span>"}
                headerHeight={28}
                rowHeight={28}
                onRowClicked={onRowClicked}
              />
            </div>
            {total !== -1 && (
              <PagiPagination
                currentPage={corpStore.page}
                totalCnt={total}
                pgSize={PAGE_SIZE}
                groupSize={10}
                onChange={corpStore.actions.setPage}
              />
            )}
          </>
          <div>
            <div className={reqModalCss.corpWrap}>
              <div className={modalCss.inputBox}>
                <label htmlFor={ReqModalInput.corpNm} className={modalCss.label}>
                  회사 명
                </label>
                <DefaultInput id={ReqModalInput.corpNm} value={corpNm} disabled={true} />
              </div>
              <div className={modalCss.inputBox}>
                <label htmlFor={ReqModalInput.corpCd} className={modalCss.label}>
                  회사 코드
                </label>
                <DefaultInput id={ReqModalInput.corpNm} value={corpCd} disabled={true} />
              </div>
            </div>
            <div className={modalCss.inputBox}>
              <label htmlFor={ReqModalInput.instCd} className={modalCss.label}>
                종목 코드
              </label>
              <DefaultInput
                id={ReqModalInput.instCd}
                value={instCd}
                disabled={true}
                // placeholder="USDT"
                // onChange={onChangeInput}
                // onReset={() => setInstCd("")}
              />
            </div>
            <div className={modalCss.inputBox}>
              <label htmlFor={ReqModalInput.amount} className={modalCss.label}>
                신청 수량
              </label>
              <DefaultInput
                id={ReqModalInput.amount}
                value={amount}
                onChange={onChangeInput}
                onReset={() => setAmount("")}
              />
            </div>
          </div>
        </div>
        <div className={modalCss.btnBox}>
          <button
            className={modalCss.btn}
            type="button"
            onClick={() => muation.mutate({ amount, instCd })}
            disabled={muation.isPending}
          >
            입금승인
          </button>
        </div>
      </div>
    </Modal>
  );
}
