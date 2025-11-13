import { ModalProps } from "@/types/common";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/components";
import { Button, RemoveScroll, Textarea } from "@mantine/core";

interface ConfirmModalProps {
  userDscr: string;
  setUserDscr: (userDscr: string) => void;
}

export default function CancelConfirmModal({
  userDscr,
  setUserDscr,
  onClose,
  onSuccess,
}: ModalProps<ConfirmModalProps>) {
  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>계약 해지 확인</ModalTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>정말 계약을 해지하시겠습니까?</p>
          </div>
          <div>
            <Textarea
              label="해지 사유"
              placeholder="해지 사유를 입력해주세요."
              value={userDscr}
              onChange={(e) => setUserDscr(e.target.value)}
              mt="md"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="default"
            type="button"
            onClick={onClose}
            c="var(--mantine-default-color)"
          >
            취소
          </Button>
          <Button variant="filled" type="button" onClick={() => onSuccess(true)}>
            확인
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
