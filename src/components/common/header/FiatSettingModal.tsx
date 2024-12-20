import { ModalProps } from "@/stores/modal";
import Modal from "../modal/Modal";
import css from "../modal/Modal.module.scss";
import ModalCloseBtn from "../modal/ModalCloseBtn";
import fiatSettingModalCss from "./FiatSettingModal.module.scss";
import classNames from "classnames";

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
      <div className={classNames(css.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={css.header}>
            <h3 className={css.title}>화폐 단위를 선택하세요</h3>
          </div>
          <div>
            <ul className={fiatSettingModalCss.list}>
              <li>
                <button className={fiatSettingModalCss.btn} onClick={() => onClick("KRW")}>
                  KRW - 대한민국 원화
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.btnBox}>
          <button className={css.btn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
