import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import SearchHome from "@/components/attendance/search-home";
import { useState } from "react";
import CompleteHome from "@/components/attendance/complete-home";
import { useUserLocation } from "@/hooks/use-user-location";
import { useWCM200101SSP02 } from "@/hooks/tms/use-attendance";
import { nativeAlert } from "@/hooks/use-device-api";
import { Loader } from "@mantine/core";

export default function Capture() {
  const router = useRouter();
  const isComplete = router.query.complete?.toString() === "true";
  const mastCorpCd = router.query.mastCorpCd?.toString() || "";
  const corpCd = router.query.corpCd?.toString() || "";
  const idxGrp = router.query.idxGrp?.toString() || "";

  const [attendanceCount, setAttendanceCount] = useState(0);

  const { userLocation } = useUserLocation();

  const siteCoorX = userLocation?.lng?.toString() || "";
  const siteCoorY = userLocation?.lat?.toString() || "";

  const TCM200101SSP02 = useWCM200101SSP02();

  const onCapture = (args: { image: Blob; attCd: "I" | "O"; session: Session }) => {
    if (TCM200101SSP02.isPending) return;

    if (!siteCoorX || !siteCoorY) {
      nativeAlert("위치 정보를 가져오는데 실패했습니다.");
      return;
    }

    TCM200101SSP02.mutate(
      {
        img: args.image,
        mastCorpCd,
        corpCd,
        attCd: args.attCd,
        session: args.session,
        siteCoorX,
        siteCoorY,
        idxGrp,
      },
      {
        onSuccess: async () => {
          nativeAlert("처리되었습니다.");
          addAttendanceCount();
        },
      },
    );
  };

  const addAttendanceCount = () => {
    setAttendanceCount((prev) => prev + 1);
  };

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  // TODO: 위치정보 가져오는중... UI 처리
  // if (siteCoorX === "" || siteCoorY === "") {
  //   return (
  //     <div className={"mobileLayout"}>
  //       <div>위치정보 가져오는중...</div>
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <Loader size="lg" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <Authorized>
      {isComplete ? (
        <CompleteHome attendanceCount={attendanceCount} mastCorpCd={mastCorpCd} corpCd={corpCd} />
      ) : (
        <SearchHome
          attCd="I"
          mastCorpCd={mastCorpCd}
          corpCd={corpCd}
          idxGrp={idxGrp}
          attendanceCount={attendanceCount}
          onCapture={onCapture}
          isLoading={TCM200101SSP02.isPending}
        />
      )}
    </Authorized>
  );
}
