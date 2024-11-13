import modalCss from "@/components/common/modal/Modal.module.scss";
import DefaultInput from "@/components/common/input/DefaultInput";
import ErrorModal from "@/components/common/modal/ErrorModal";
import callTms from "@/libraries/callTms";
import { ModalProps, useSetModalStore } from "@/stores/modal";
import { TBW_000010_P01 } from "@/types/api";
import { checkEnNumSp } from "@/utils/regexp";
import { useMutation } from "@tanstack/react-query";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useSetAdminStore } from "@/stores/admin";
import creEmplModalCss from "./CreEmplModal.module.scss";
import { Modal } from "@mantine/core";

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
      if (!arg.extnUserId.trim()) throw new Error("관리자 ID를 입력해주세요.");
      if (arg.extnUserId.length > 50) throw new Error("관리자 ID는 50자리 이하로 입력해주세요.");
      if (!arg.emplName.trim()) throw new Error("관리자 명을 입력해주세요.");
      if (arg.emplName.length > 50) throw new Error("관리자 명은 50자리 이하로 입력해주세요.");
      if (!arg.pw.trim()) throw new Error("비밀번호를 입력해주세요.");
      if (!arg.adminPw.trim()) throw new Error("관리자 Password를 입력해주세요.");
      if (!checkEnNumSp(arg.pw) || arg.pw.length < 7) {
        throw new Error("비밀번호는 영문, 숫자, 특수문자만 입력 가능하며 7자리 이상이어야 합니다.");
      }

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
      toast.success("관리자가 등록되었습니다.");
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
    <Modal opened centered onClose={onClose} title="관리자 생성">
      <form onSubmit={handleSubmit}>
        <div className={creEmplModalCss.inputBox}>
          <label className={creEmplModalCss.label} htmlFor={CreEmplInput.extnUserId}>
            관리자 ID
          </label>
          <DefaultInput id={CreEmplInput.extnUserId} />
        </div>
        <div className={creEmplModalCss.inputBox}>
          <label className={creEmplModalCss.label} htmlFor={CreEmplInput.emplName}>
            관리자 명
          </label>
          <DefaultInput id={CreEmplInput.emplName} />
        </div>
        <div className={creEmplModalCss.inputBox}>
          <label className={creEmplModalCss.label} htmlFor={CreEmplInput.pw}>
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
        <div className={creEmplModalCss.inputBox}>
          <label className={creEmplModalCss.label} htmlFor={CreEmplInput.pwCheck}>
            신규 비밀번호 확인
          </label>
          <DefaultInput
            id={CreEmplInput.pwCheck}
            type={"password"}
            inputRef={pwCheckRef}
            onChange={checkPw}
          />
          <div className={creEmplModalCss.pwCheckBox}>
            {!validationPw ? "비밀번호가 일치하지 않습니다." : ""}
          </div>
        </div>
        <div className={creEmplModalCss.inputBox}>
          <label className={creEmplModalCss.label} htmlFor={CreEmplInput.pw}>
            관리자 Password
          </label>
          <DefaultInput id={CreEmplInput.adminPw} type="password" />
        </div>

        <div className={modalCss.btnBox}>
          <button
            className={modalCss.btn}
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
