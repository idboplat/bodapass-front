import { ModalProps } from "@/stores/modal";
import Modal from "../modal/Modal";
import css from "../modal/Modal.module.scss";
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
    <Modal id={ID} onClose={onClose} title="화폐 단위를 선택하세요">
      <div className={classNames(css.content)}>
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
    </Modal>
  );
}
