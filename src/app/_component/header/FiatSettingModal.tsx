import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "../modal/Modal";
import * as css from "../modal/modal.css";
import { modalDefaultBtn } from "../modal/modalBtn.css";
import ModalCloseBtn from "../modal/ModalCloseBtn";
import { item, list, button } from "./fiatSettingModal.css";

export const ID = "fiatSettingModal";

interface FiatSettingModalProps {}

export default function FiatSettingModal({
  onClose,
  onSuccess,
}: ModalProps<FiatSettingModalProps>) {
  const onClick = (value: string) => {
    onSuccess(value);
  };
  return (
    <Modal id={ID} onClose={onClose}>
      <div className={css.modalCenterContent}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.modalHeader}>
            <h3 className={css.modalTitle}>화폐 단위를 선택하세요</h3>
          </div>
          <div>
            <ul className={list}>
              <li className={item}>
                <button className={button} onClick={() => onClick("KRW")}>
                  KRW - 대한민국 원화
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.modalBtnBox}>
          <button className={modalDefaultBtn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
