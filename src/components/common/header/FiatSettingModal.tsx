import { ModalProps } from "@/stores/modal";
import fiatSettingModalCss from "./FiatSettingModal.module.scss";
import { RemoveScroll } from "react-remove-scroll";
import { ModalBody, ModalFooter, ModalHeader, ModalInner, ModalTitle } from "../modal/Components";
import { Button } from "@mantine/core";

interface FiatSettingModalProps {}

export default function FiatSettingModal({
  onClose,
  onSuccess,
}: ModalProps<FiatSettingModalProps>) {
  const onClick = (value: string) => {
    onSuccess(value);
  };

  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>화폐 단위를 선택하세요</ModalTitle>
          </div>
        </ModalHeader>

        <ModalBody>
          <div>
            <ul className={fiatSettingModalCss.list}>
              <li>
                <button className={fiatSettingModalCss.btn} onClick={() => onClick("KRW")}>
                  KRW - 대한민국 원화
                </button>
              </li>
            </ul>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button type="button" onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
