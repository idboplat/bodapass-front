import DefaultInput from "@/app/_component/input/DefaultInput";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import TextSelect from "@/app/_component/select/TextSelect";
import { ModalProps, useSetModalStore } from "@/app/_lib/modalStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { inputBox, label } from "./creCorpModal.css";
import callTms from "@/model/callTms";
import { TBW_000000_P01 } from "@/type/api";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useSetCorpStore } from "../_lib/store";
import CreCorpAlertModal from "./CreCorpAlertModal";
import { CORP_GRP_ITEM, findEntity } from "@/app/_const/tp";
import { selectBoxWrap } from "./nav.css";
import SelectLabel from "@/app/_component/select/SelectLabel";

const ID = "creCorpModal";

enum CreCorpInput {
  corpGrpTp = ID + "Type",
  corpNm = ID + "CorpNm",
  mastCorpCd = ID + "MastCorpCd",
  pw = ID + "Pw",
}

interface CreCorpModalProps {
  session: Session;
  corpGrpTpItems: string[];
}

export default function CreCorpModal({
  onClose,
  onSuccess,
  session,
  corpGrpTpItems,
}: ModalProps<CreCorpModalProps>) {
  const [corpGrpTp, setCorpGrpTp] = useState(corpGrpTpItems[0]);
  const [corpNm, setCorpNm] = useState("");
  const [mastCorpCd, setMastCorpCd] = useState("");
  const [pwCheck] = useState(false);

  const actions = useSetCorpStore();
  const modalAction = useSetModalStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000000_P01"],
    mutationFn: async () => {
      const TBW_000000_P01Res = await callTms<TBW_000000_P01>({
        session,
        svcId: "TBW_000000_P01",
        data: [corpNm.trim(), corpGrpTp || "", session.user.corpCd],
      });
      const TBW_000000_P01Data = TBW_000000_P01Res.svcRspnData;
      if (TBW_000000_P01Data === null) {
        throw new Error("TBW_000000_P01Data is null");
      }
      return {
        id: TBW_000000_P01Data[0].F04,
        password: TBW_000000_P01Data[0].F05,
      };
    },
    onSuccess: async (data) => {
      toast.success("회사가 등록되었습니다.");
      actions.reset();
      await modalAction.push(CreCorpAlertModal, { props: { ...data } });
      onSuccess(true);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const item = findEntity(CORP_GRP_ITEM, corpGrpTp);
      setCorpGrpTp(() => item?.[0] || "");
      mutation.mutate();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case CreCorpInput.corpNm:
        setCorpNm(() => value);
        break;
      case CreCorpInput.mastCorpCd:
        setMastCorpCd(() => value);
        break;
    }
  };

  const onChangeSelect = (value: string) => {
    setCorpGrpTp(() => value);
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>회사 등록</h3>
          </div>
          <div className={inputBox}>
            <div className={selectBoxWrap}>
              <SelectLabel>회사 그룹 구분</SelectLabel>
              <TextSelect
                value={corpGrpTp}
                onChange={onChangeSelect}
                items={corpGrpTpItems}
                style={{
                  height: 36,
                }}
              />
            </div>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreCorpInput.corpNm}>
              회사명
            </label>
            <DefaultInput
              id={CreCorpInput.corpNm}
              value={corpNm}
              onChange={onChangeInput}
              onReset={() => setCorpNm("")}
            />
          </div>
          {/* <div className={inputBox}>
            <label className={label} htmlFor={CreCorpInput.mastCorpCd}>
              주 회사 코드
            </label>
            <DefaultInput
              value={mastCorpCd}
              id={CreCorpInput.mastCorpCd}
              onChange={onChangeInput}
              onReset={() => setMastCorpCd("")}
            />
          </div> */}
          {/* <div className={inputBox}>
            <label className={label} htmlFor={CreCorpInput.pw}>
              Main 관리자 비밀번호
            </label>
            <DefaultInput
              id={CreCorpInput.pw}
              onChange={onChangeInput}
              type={pwCheck ? "text" : "password"}
            />
          </div> */}
        </div>
        <div className={css.modalBtnBox}>
          <button className={modalDefaultBtn} type="submit" disabled={mutation.isPending}>
            등록
          </button>
        </div>
      </form>
    </Modal>
  );
}
