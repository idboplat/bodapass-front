import CheckBox from "@/components/common/input/CheckBox";
import modalCss from "@/components/common/modal/Modal.module.scss";
import { ModalProps } from "@/stores/modal";
import classNames from "classnames";
import { useState } from "react";
import { toast } from "sonner";
import creCorpAlertModalCss from "./CreCorpAlertModal.module.scss";
import { Modal } from "@mantine/core";

interface CreCorpAlertModalProps {
  id: string;
  password: string;
}

export default function CreCorpAlertModal({
  id,
  password,
  onClose,
}: ModalProps<CreCorpAlertModalProps>) {
  const [isCheck, setIsCheck] = useState(false);
  const onClickCopy = () => {
    window.navigator.clipboard.writeText(`관리자 ID : ${id}\n패스워드 : ${password}`);
    toast.success("클립보드에 복사 되었습니다.");
  };
  return (
    <Modal opened centered onClose={onClose} title="회사 생성" size={400}>
      <div className={modalCss.stack}>
        <div className={creCorpAlertModalCss.textBox}>
          <p>{`관리자 ID : ${id}`}</p>
        </div>
        <div className={creCorpAlertModalCss.textBox}>
          <p>{`비밀번호 : ${password}`}</p>
        </div>
        <div className={creCorpAlertModalCss.descBox}>
          <CheckBox value={isCheck} onClick={() => setIsCheck(() => !isCheck)} />
          <p>관리자 ID와 비밀번호를 확인하시고, G2 관리자에게 전달하시기 바랍니다.</p>
        </div>
      </div>
      <div className={modalCss.btnBox}>
        <button className={modalCss.btn} type="button" onClick={onClose} disabled={!isCheck}>
          확인
        </button>
        <button className={classNames(modalCss.btn, "save")} type="button" onClick={onClickCopy}>
          복사
        </button>
      </div>
    </Modal>
  );
}
