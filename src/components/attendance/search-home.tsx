import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import Capture from "../capture";
import { useTCM200101SSP02 } from "@/hooks/tms/use-attendance";
import { Button, RemoveScroll, Switch, Textarea } from "@mantine/core";
import { DEVICE_API } from "@/types/common";
import { Moon, Sun, Camera } from "lucide-react";
import styles from "./search-home.module.scss";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/components";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Portal from "../common/modal/portal";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";
import { useUserLocation } from "@/hooks/use-user-location";

interface Props {
  attCd: "I" | "O";
}

export default function SearchHome({ attCd }: Props) {
  const router = useRouter();

  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";

  const [isNightMode, setIsNightMode] = useState(false);
  const [showNightModeModal, setShowNightModeModal] = useState(false);

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const TCM200101SSP02 = useTCM200101SSP02();
  const { userLocation } = useUserLocation();

  const siteCoorX = userLocation?.lng?.toString() || "";
  const siteCoorY = userLocation?.lat?.toString() || "";

  const onCapture = (args: { image: Blob }) => {
    if (TCM200101SSP02.isPending) return;

    // 위도 lat y
    // 경도 lng x
    // const siteCoorX = userLocation?.lng?.toString() || "";
    // const siteCoorY = userLocation?.lat?.toString() || "";

    TCM200101SSP02.mutate(
      {
        img: args.image,
        mastCorpCd,
        corpCd,
        attCd,
        session,
        siteCoorX,
        siteCoorY,
      },
      {
        onSuccess: async () => {
          nativeAlert("처리되었습니다.");
        },
      },
    );
  };

  const onClickNightMode = () => {
    setIsNightMode((prev) => !prev);
  };

  const onClickComplete = () => {
    if (window.ReactNativeWebView) {
      sendMessageToDevice({
        type: DEVICE_API.attendanceComplete,
        payload: { mastCorpCd, corpCd },
      });
    }
  };

  const onCloseNightModeModal = () => {
    setShowNightModeModal(() => false);
    // setIsNightMode(() => false);
  };

  useEffect(() => {
    if (isNightMode) {
      setShowNightModeModal(() => true);
    } else {
      setShowNightModeModal(() => false);
    }
  }, [isNightMode]);

  return (
    <div className={"mobileLayout"}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
          height: "100%",
          gap: "1rem",
          padding: "0 0.5rem",
        }}
      >
        <Switch
          checked={isNightMode}
          size="md"
          color="dark.4"
          onLabel={<Moon size={16} color="yellow" />}
          offLabel={<Sun size={16} color="blue" />}
          onChange={onClickNightMode}
        />
      </div>
      <div>
        위도: {siteCoorY}, 경도: {siteCoorX}
      </div>
      <Capture onCapture={onCapture} isLoading={TCM200101SSP02.isPending} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Button onClick={onClickComplete}>출석 완료</Button>
      </div>
      {showNightModeModal && (
        <AnimatePresence>
          <Portal id={PORTAL_MODAL_CONTAINER_ID}>
            <NightModeModal onClose={onCloseNightModeModal} />
          </Portal>
        </AnimatePresence>
      )}
    </div>
  );
}

function NightModeModal({ onClose }: { onClose: () => void }) {
  const [memo, setMemo] = useState("");

  const onClick = () => {
    onClose();
  };

  return (
    <RemoveScroll removeScrollBar={false}>
      <ModalInner
        className={styles.nightModeModalInner}
        style={{ maxWidth: "500px" }}
        outSideClick={onClose}
      >
        <ModalHeader>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Moon size={20} color="#ffd700" />
            <ModalTitle className={styles.nightModeTitle}>야근모드 촬영</ModalTitle>
            <Camera size={18} color="#ffd700" style={{ opacity: 0.8 }} />
          </div>
        </ModalHeader>
        <ModalBody className={styles.nightModeBody}>
          <div>
            <p>메모를 남기세요.</p>
            <Textarea
              value={memo}
              onChange={(event) => setMemo(event.currentTarget.value)}
              placeholder="야간 근무 시 메모를 입력하세요..."
              classNames={{
                input: styles.nightModeTextarea,
              }}
              rows={4}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClick}
            variant="filled"
            type="button"
            className={styles.nightModeConfirmButton}
            style={{
              background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)",
              color: "#000",
            }}
          >
            확인
          </Button>
          <Button
            variant="default"
            onClick={onClose}
            className={styles.nightModeCloseButton}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            닫기
          </Button>
        </ModalFooter>
      </ModalInner>
    </RemoveScroll>
  );
}
