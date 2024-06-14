import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as style from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import TextSelect from "@/app/_component/select/TextSelect";
import { ModalProps } from "@/app/_lib/modalStore";
import { CORP_GRP, CORP_GRP_TP } from "@/type/common";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { inputBox, label } from "./createCorpModal.css";

const ID = "createCorpModal";

enum CreateCorpInput {
  corpGrpTp = ID + "Type",
  corpNm = ID + "CorpNm",
  mastCorpCd = ID + "MastCorpCd",
  pw = ID + "Pw",
}

type corpGrpType = "G1" | "G2" | "G3" | "G4";
interface CreateCorpModalProps {}

export default function CreateCorpModal({ onClose, onSuccess }: ModalProps<CreateCorpModalProps>) {
  const [corpGrpTp, setCorpGrpTp] = useState<corpGrpType | null>(null);
  const [corpNm, setCorpNm] = useState("");
  const [mastCorpCd, setMastCorpCd] = useState("");
  const [pwCheck] = useState(false);

  const mutation = useMutation({
    mutationKey: ["서비스 아이디"],
    mutationFn: async () => {
      console.table({ corpGrpTp, corpNm: corpNm.trim(), mastCorpCd });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      mutation.mutate();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const getCorpGrpTpItems = (corpGrpTp: CORP_GRP_TP) => {
    const idx = CORP_GRP.findIndex((v) => v === corpGrpTp);
    return CORP_GRP.slice(idx + 1);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case CreateCorpInput.corpNm:
        setCorpNm(() => value);
        break;
      case CreateCorpInput.mastCorpCd:
        setMastCorpCd(() => value);
        break;
    }
  };

  const onChangeSelect = (value: string) => setCorpGrpTp(() => value as corpGrpType);

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={style.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={style.modalHeader}>
            <h3 className={style.modalTitle}>회사 등록</h3>
          </div>
          <div className={inputBox}>
            <TextSelect
              value={corpGrpTp}
              onChange={onChangeSelect}
              items={getCorpGrpTpItems("G1")}
              placeholder="회사그룹 구분"
              style={{
                height: 35.6,
              }}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateCorpInput.corpNm}>
              회사명
            </label>
            <DefaultInput
              id={CreateCorpInput.corpNm}
              value={corpNm}
              onChange={onChangeInput}
              onReset={() => setCorpNm("")}
            />
          </div>

          <div className={inputBox}>
            <label className={label} htmlFor={CreateCorpInput.mastCorpCd}>
              주 회사 코드
            </label>
            <DefaultInput
              value={mastCorpCd}
              id={CreateCorpInput.mastCorpCd}
              onChange={onChangeInput}
              onReset={() => setMastCorpCd("")}
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreateCorpInput.pw}>
              Main 관리자 비밀번호
            </label>
            <DefaultInput
              id={CreateCorpInput.pw}
              onChange={onChangeInput}
              type={pwCheck ? "text" : "password"}
            />
          </div>
        </div>
        <div className={style.modalBtnBox}>
          <button className={modalDefaultBtn} type="submit" disabled={mutation.isPending}>
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
