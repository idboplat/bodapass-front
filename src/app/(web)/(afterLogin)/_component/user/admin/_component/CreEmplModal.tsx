import DefaultInput from "@/app/_component/input/DefaultInput";
import ErrorModal from "@/app/_component/modal/ErrorModal";
import Modal from "@/app/_component/modal/Modal";
import ModalCloseBtn from "@/app/_component/modal/ModalCloseBtn";
import * as css from "@/app/_component/modal/modal.css";
import { modalDefaultBtn } from "@/app/_component/modal/modalBtn.css";
import { ModalProps, useSetModalStore } from "@/app/_lib/modalStore";
import callTms from "@/model/callTms";
import { TBW_000010_P01 } from "@/type/api";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSetAdminStore } from "../_lib/store";
import { inputBox, label, pwCheckBox } from "./creEmplModal.css";
import { input } from "@web/(beforeLogin)/login/_component/loginForm.css";
import { checkEnglishNumericSpecial, checkKoreanEnglishNumericSpecial } from "@/app/_lib/regexp";

const ID = "creEmplModal";

enum CreEmplInput {
  extnUserId = ID + "ExtnUserId",
  emplName = ID + "EmplName",
  pw = ID + "Pw",
  pwCheck = ID + "PwCheck",
  adminPw = ID + "AdminPw",
}

interface CreEmplModalProps {
  session: Session;
}

export default function CreEmplModal({ onClose, session }: ModalProps<CreEmplModalProps>) {
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);
  const [validationPw, setValidationPw] = useState(true);

  const actions = useSetAdminStore();
  const modalStore = useSetModalStore();

  const mutation = useMutation({
    mutationKey: ["TBW_000010_P01"],
    mutationFn: async (arg: {
      extnUserId: string;
      emplName: string;
      pw: string;
      adminPw: string;
    }) => {
      if (!checkEnglishNumericSpecial(arg.extnUserId))
        throw new Error("관리자 ID는 영문, 숫자, 특수문자만 입력 가능합니다.");
      if (!checkKoreanEnglishNumericSpecial(arg.emplName))
        throw new Error("신규 관리자 명은 한글, 영문, 숫자, 특수문자만 입력 가능합니다.");
      if (arg.pw === "") throw new Error("비밀번호를 입력해주세요.");
      if (!checkEnglishNumericSpecial(arg.pw) || arg.pw.length < 7)
        throw new Error("비밀번호는 영문, 숫자, 특수문자만 입력 가능하며 7자리 이상이어야 합니다.");
      if (!arg.adminPw) throw new Error("관리자 Password를 입력해주세요.");

      const TBW_000010_P01Res = await callTms<TBW_000010_P01>({
        session,
        svcId: "TBW_000010_P01",
        data: [
          session.user.corpCd.trim(),
          arg.extnUserId.trim(),
          arg.emplName.trim(),
          arg.pw,
          arg.adminPw,
        ],
      });
      const TBW_000010_P01Data = TBW_000010_P01Res.svcRspnData;
      if (TBW_000010_P01Data === null) {
        throw new Error("TBW_000010_P01Data is null");
      }
    },
    onSuccess: () => {
      toast.success("사원이 등록되었습니다.");
      actions.reset();
      onClose();
    },
  });

  const checkPw = () => {
    const pw = pwRef.current?.value;
    const pwCheck = pwCheckRef.current?.value;

    setValidationPw(() => pw === pwCheck);
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const extnUserId = e.target[CreEmplInput.extnUserId].value.trim();
      const emplName = e.target[CreEmplInput.emplName].value.trim();
      const pw = e.target[CreEmplInput.pw].value.trim();
      const adminPw = e.target[CreEmplInput.adminPw].value;

      // mutation.mutate([session.user.corpCd, extnUserId.trim(), emplName.trim(), pw, adminPw]);
      mutation.mutate({ extnUserId, emplName, pw, adminPw });
    } catch (error) {
      if (error instanceof Error) {
        await modalStore.push(ErrorModal, { props: { error } });
      }
    }
  };

  return (
    <Modal id={ID} onClose={onClose}>
      <form onSubmit={handleSubmit} className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>관리자 생성</h3>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.extnUserId}>
              관리자 ID
            </label>
            <DefaultInput
              id={CreEmplInput.extnUserId}
              placeholder="영문, 숫자, 특수문자만 입력 가능합니다."
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.emplName}>
              신규 관리자 명
            </label>
            <DefaultInput
              id={CreEmplInput.emplName}
              placeholder="한글, 영문, 숫자, 특수문자만 입력 가능합니다."
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pw}>
              신규 비밀번호
            </label>
            <DefaultInput
              id={CreEmplInput.pw}
              type={"password"}
              inputRef={pwRef}
              onChange={checkPw}
              placeholder="영문, 숫자, 특수문자만 입력 가능하며 7자 이상이어야 합니다."
            />
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pwCheck}>
              신규 비밀번호 확인
            </label>
            <DefaultInput
              id={CreEmplInput.pwCheck}
              type={"password"}
              inputRef={pwCheckRef}
              onChange={checkPw}
            />
            <div className={pwCheckBox}>{!validationPw ? "비밀번호가 일치하지 않습니다." : ""}</div>
          </div>
          <div className={inputBox}>
            <label className={label} htmlFor={CreEmplInput.pw}>
              관리자 Password
            </label>
            <DefaultInput id={CreEmplInput.adminPw} type="password" />
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button
            className={modalDefaultBtn}
            type="submit"
            disabled={validationPw === false || mutation.isPending}
          >
            관리자 생성
          </button>
        </div>
      </form>
    </Modal>
  );
}
