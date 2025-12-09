import { ModalProps } from "@/types/common";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/components";
import { Button, RemoveScroll, Select, Textarea, TextInput } from "@mantine/core";

interface ConfirmModalProps {
  userDscr: string;
  setUserDscr: (userDscr: string) => void;
  userDscrOther: string;
  setUserDscrOther: (userDscrOther: string) => void;
}

export default function CancelConfirmModal({
  userDscr,
  setUserDscr,
  onClose,
  onSuccess,
  userDscrOther,
  setUserDscrOther,
}: ModalProps<ConfirmModalProps>) {
  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner style={{ maxWidth: "500px" }} outSideClick={onClose}>
        <ModalHeader>
          <div>
            <ModalTitle>현장근무 제외</ModalTitle>
          </div>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>정말 현장투입에서 제외하십니까?</p>
          </div>

          {/* <div>
            <Select
              label="해지 사유"
              value={userDscr}
              onChange={(value) => {
                setUserDscr(value || "");
                if (value !== "기타") {
                  setUserDscrOther("");
                }
              }}
              placeholder="해지 사유를 선택해주세요"
              data={["근무 일정 변경", "계약 기간 만료", "기타"]}
              allowDeselect={false}
              comboboxProps={{ withinPortal: false }}
              mt={10}
            />
            {userDscr === "기타" && (
              <TextInput
                label="기타 사유 입력"
                value={userDscrOther}
                onChange={(e) => setUserDscrOther(e.target.value)}
                placeholder="기타 사유를 입력해주세요"
                mt={10}
                required
              />
            )}
          </div> */}
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
