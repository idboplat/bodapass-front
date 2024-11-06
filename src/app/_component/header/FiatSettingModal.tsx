import { ModalProps } from "@/app/_lib/modalStore";
import Modal from "../modal/Modal";
import module from "../modal/Modal.module.scss";
import ModalCloseBtn from "../modal/ModalCloseBtn";
import fiatSettingModalModule from "./FiatSettingModal.module.scss";
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
      <div className={classNames(module.content, "center")}>
        <ModalCloseBtn onClose={onClose} />
        <div>
          <div className={module.header}>
            <h3 className={module.title}>화폐 단위를 선택하세요</h3>
          </div>
          <div>
            <ul className={fiatSettingModalModule.list}>
              <li>
                <button className={fiatSettingModalModule.btn} onClick={() => onClick("KRW")}>
                  KRW - 대한민국 원화
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className={module.btnBox}>
          <button className={module.btn} type="button" onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
