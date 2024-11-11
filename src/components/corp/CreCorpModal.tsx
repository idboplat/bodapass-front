import DefaultInput from "@/components/common/input/DefaultInput";
import Modal from "@/components/common/modal/Modal";
import ModalCloseBtn from "@/components/common/modal/ModalCloseBtn";
import modalCss from "@/components/common/modal/Modal.module.scss";
import TextSelect from "@/components/common/select/TextSelect";
import { ModalProps, useSetModalStore } from "@/stores/modal";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import creCorpModalCss from "./CreCorpAlertModal.module.scss";
import callTms from "@/libraries/callTms";
import { TBW_000000_P01 } from "@/types/api";
import { Session } from "next-auth";
import { toast } from "sonner";
import { useSetCorpStore } from "@/stores/corp";
import CreCorpAlertModal from "./CreCorpAlertModal";
import { CORP_GRP_ITEM, findEntity } from "@/types/tp";
import LabelSelect from "@/components/common/select/LabelSelect";
import { checkCorpNm } from "@/utils/regexp";
import classNames from "classnames";

const ID = "creCorpModal";

enum CreCorpInput {
  corpGrpTp = ID + "Type",
  corpNm = ID + "CorpNm",
  adminPw = ID + "AdminPw",
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

  const actions = useSetCorpStore();
  const modalAction = useSetModalStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000000_P01"],
    mutationFn: async (arg: { adminPw: string; grpTp: string }) => {
      if (!arg.grpTp) {
        throw new Error("회사 그룹 구분을 선택해주세요");
      }
      if (!checkCorpNm(corpNm.trim())) {
        // 공백만 입력한 경우 안되게 trim 적용
        throw new Error("회사명은 한글, 영문, 숫자만 입력 가능합니다.");
      }
      if (!arg.adminPw) throw new Error("관리자 Password를 입력해주세요.");
      const TBW_000000_P01Res = await callTms<TBW_000000_P01>({
        session,
        svcId: "TBW_000000_P01",
        data: [corpNm.trim(), arg.grpTp, session.user.corpCd, arg.adminPw],
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
      toast.success("회사가 생성되었습니다.");
      actions.reset();
      await modalAction.push(CreCorpAlertModal, { props: { ...data } });
      onSuccess(true);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const item = findEntity(CORP_GRP_ITEM, corpGrpTp);
    const grpTp = item?.[0] || "";
    const adminPw = e.target?.[CreCorpInput.adminPw]?.value;
    mutation.mutate({ adminPw, grpTp });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case CreCorpInput.corpNm:
        setCorpNm(() => value);
        break;
    }
  };

  const onChangeSelect = (value: string) => {
    setCorpGrpTp(() => value);
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={classNames(modalCss.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={modalCss.header}>
            <h3 className={modalCss.title}>회사 생성</h3>
          </div>
          <div className={creCorpModalCss.inputBox}>
            <div className={creCorpModalCss.selectBoxWrap}>
              <LabelSelect>회사 유형</LabelSelect>
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
          <div className={creCorpModalCss.inputBox}>
            <label className={creCorpModalCss.label} htmlFor={CreCorpInput.corpNm}>
              회사명
            </label>
            <DefaultInput
              id={CreCorpInput.corpNm}
              value={corpNm}
              onChange={onChangeInput}
              onReset={() => setCorpNm("")}
              style={{ width: "100%" }}
              placeholder="회사명은 한글, 영문, 숫자만 입력 가능합니다."
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
          <div className={creCorpModalCss.inputBox}>
            <label className={creCorpModalCss.label} htmlFor={CreCorpInput.adminPw}>
              관리자 Password
            </label>
            <DefaultInput id={CreCorpInput.adminPw} onChange={onChangeInput} type={"password"} />
          </div>
        </div>
        <div className={modalCss.btnBox}>
          <button className={modalCss.btn} type="submit" disabled={mutation.isPending}>
            회사 생성
          </button>
        </div>
      </form>
    </Modal>
  );
}
