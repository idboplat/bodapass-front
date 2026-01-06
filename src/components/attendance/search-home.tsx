import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import Capture from "../capture";
import { useTCM200101SSQ01 } from "@/hooks/tms/use-attendance";
import { Button, RemoveScroll, Switch, Textarea } from "@mantine/core";
import { Moon, Sun, Camera } from "lucide-react";
import css from "./search-home.module.scss";
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from "@/components/common/modal/components";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import Portal from "../common/modal/portal";
import { PORTAL_MODAL_CONTAINER_ID } from "@/constants";
import CameraView from "../camera-view";
import { useCameraCapture } from "@/hooks/use-camera-capture";
import CameraControls from "../camera-controls";
import OutlineButton from "../common/outline-button";
import Badge from "../common/badge";
import CrewIcon from "/public/assets/svg/crew-icon.svg";
import OutIcon from "/public/assets/svg/out-icon.svg";

interface Props {
  attCd: "I" | "O";
  attendanceCount: number;
  mastCorpCd: string;
  corpCd: string;
  idxGrp: string;
  onCapture: (args: { image: Blob; attCd: "I" | "O"; session: Session }) => void;
  isLoading: boolean;
}

export default function SearchHome({
  attCd,
  attendanceCount,
  mastCorpCd,
  corpCd,
  idxGrp,
  onCapture,
  isLoading,
}: Props) {
  const router = useRouter();

  // const [isNightMode, setIsNightMode] = useState(false);
  // const [showNightModeModal, setShowNightModeModal] = useState(false);

  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  const TCM200101SSQ01 = useTCM200101SSQ01({ session, mastCorpCd, corpCd, userId: session.userId });

  // 카메라 촬영을 위한 ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraMode, setCameraMode] = useState<"front" | "back">("front");

  const { capture } = useCameraCapture({
    videoRef,
    cameraMode,
    onCapture: (blob) => {
      onCapture({ image: blob, attCd, session });
    },
  });

  const onClickCapture = () => {
    capture();
  };

  // const onClickNightMode = () => {
  //   setIsNightMode((prev) => !prev);
  // };

  const onClickComplete = () => {
    router.replace(`/ko/attendance/${mastCorpCd}/${corpCd}/${idxGrp}/in?complete=true`);
  };

  // const onCloseNightModeModal = () => {
  //   setShowNightModeModal(() => false);
  // };

  // useEffect(() => {
  //   if (isNightMode) {
  //     setShowNightModeModal(() => true);
  //   } else {
  //     setShowNightModeModal(() => false);
  //   }
  // }, [isNightMode]);

  return (
    <div className={`${css.container} mobileLayout`}>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          width: "100%",
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
      </div> */}
      <CameraView videoRef={videoRef} cameraMode={cameraMode} />
      <div className={css.attendanceInfo}>
        <Badge
          leftIcon={<CrewIcon />}
          style={{
            fontSize: "16px",
            letterSpacing: "-0.5px",
            fontWeight: "500",
            padding: "0.5rem 1rem",
          }}
        >
          팀원 : {TCM200101SSQ01.data?.ordrCnt}명
        </Badge>
        <Badge
          leftIcon={<OutIcon />}
          style={{
            fontSize: "16px",
            letterSpacing: "-0.5px",
            fontWeight: "500",
            padding: "0.5rem 1rem",
          }}
        >
          출근 : {attendanceCount}명
        </Badge>
      </div>

      <div className={css.bottomSection}>
        <CameraControls
          cameraMode={cameraMode}
          onCameraModeChange={(mode) => setCameraMode(mode)}
          onCapture={onClickCapture}
          isLoading={isLoading}
        />
        <div className={css.buttonContainer}>
          <OutlineButton
            onClick={onClickComplete}
            fullWidth
            style={{ borderRadius: "12px", fontSize: "18px", fontWeight: "700" }}
          >
            출근 완료
          </OutlineButton>
        </div>
      </div>

      {/* {showNightModeModal && (
        <AnimatePresence>
          <Portal id={PORTAL_MODAL_CONTAINER_ID}>
            <NightModeModal onClose={onCloseNightModeModal} />
          </Portal>
        </AnimatePresence>
      )} */}
    </div>
  );
}

// function NightModeModal({ onClose }: { onClose: () => void }) {
//   const [memo, setMemo] = useState("");

//   const onClick = () => {
//     onClose();
//   };

//   return (
//     <RemoveScroll removeScrollBar={false}>
//       <ModalInner
//         className={styles.nightModeModalInner}
//         style={{ maxWidth: "500px" }}
//         outSideClick={onClose}
//       >
//         <ModalHeader>
//           <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
//             <Moon size={20} color="#ffd700" />
//             <ModalTitle className={styles.nightModeTitle}>야근모드 촬영</ModalTitle>
//             <Camera size={18} color="#ffd700" style={{ opacity: 0.8 }} />
//           </div>
//         </ModalHeader>
//         <ModalBody className={styles.nightModeBody}>
//           <div>
//             <p>메모를 남기세요.</p>
//             <Textarea
//               value={memo}
//               onChange={(event) => setMemo(event.currentTarget.value)}
//               placeholder="야간 근무 시 메모를 입력하세요..."
//               classNames={{
//                 input: styles.nightModeTextarea,
//               }}
//               rows={4}
//             />
//           </div>
//         </ModalBody>
//         <ModalFooter>
//           <Button
//             onClick={onClick}
//             variant="filled"
//             type="button"
//             className={styles.nightModeConfirmButton}
//             style={{
//               background: "linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)",
//               color: "#000",
//             }}
//           >
//             확인
//           </Button>
//           <Button
//             variant="default"
//             onClick={onClose}
//             className={styles.nightModeCloseButton}
//             style={{
//               background: "rgba(255, 255, 255, 0.1)",
//               color: "#fff",
//               border: "1px solid rgba(255, 255, 255, 0.2)",
//             }}
//           >
//             닫기
//           </Button>
//         </ModalFooter>
//       </ModalInner>
//     </RemoveScroll>
//   );
// }
