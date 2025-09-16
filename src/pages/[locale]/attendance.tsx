import { Authorized } from "@/libraries/auth/authorized";
import { useSession } from "@/libraries/auth/use-session";
import { callTms, StringRspnData } from "@/libraries/call-tms";
import { getStaticPaths, makeStaticProps } from "@/libraries/i18n/get-static";
import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import css from "./attendance.module.scss";

const getSiteInfo = async ({ session }: { session: Session }) => {
  const result = await callTms<StringRspnData<4>>({
    svcId: "TCM200100SMQ01",
    session,
    locale: "ko",
    data: [session.userId],
  });

  const data = result.svcRspnData || [];

  return data.map((d) => ({
    mastCorpCd: d.F01,
    mastCorpNm: d.F02,
    corpCd: d.F03,
    siteNm: d.F04,
  }));
};

const getEmployeesByCorpCd = async ({
  session,
  ...args
}: { session: Session } & {
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}) => {
  // teamleader1@gmail.com 고정 테스트
  const result = await callTms<StringRspnData<12>>({
    svcId: "TCM200101SMQ01",
    session,
    locale: "ko",
    data: [args.mastCorpCd, args.corpCd, args.userId],
    pathName: "TCM200101SMQ01",
  });

  const data = result.svcRspnData || [];

  return data.map((d) => ({
    mastCorpCd: d.F01,
    corpCd: d.F02,
    userId: d.F03,
    instCd: d.F04,
    ordrPrc: d.F05,
    wrkStrDd: d.F06,
    wrkEndDd: d.F07,
    cntr: d.F08 === "Y",
    ins: d.F09 === "Y",
    userNm: d.F10,
    bigTxt: d.F11,
  }));
};

export default function Attendance() {
  return (
    <Authorized>
      <div>
        <Content />
      </div>
    </Authorized>
  );
}

const Content = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [mastCorpCd, setMastCorpCd] = useState<string>("");
  const [corpCd, setCorpCd] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const onClickAttBtn = (
    attCd: "I" | "O" | "A",
    mastCorpCd: string,
    corpCd: string,
    userId: string,
  ) => {
    router.push(
      `/ko/capture?attCd=${attCd}&mastCorpCd=${mastCorpCd}&corpCd=${corpCd}&userId=${userId}`,
    );
  };

  if (!session) throw new Error("Session is not found");

  const { data: siteInfo, isPending: isSiteInfoPending } = useQuery({
    queryKey: ["TCM200100SMQ01", session, mastCorpCd, corpCd],
    queryFn: () => getSiteInfo({ session }),
  });

  const { data: attList, isPending: isAttListPending } = useQuery({
    queryKey: ["TCM200101SMQ01", session, mastCorpCd, corpCd],
    queryFn: () => getEmployeesByCorpCd({ session, mastCorpCd, corpCd, userId }),
    enabled: !!mastCorpCd && !!corpCd,
  });

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["TCM200101SMQ01", session, mastCorpCd, corpCd] });
  };

  return (
    <>
      <div className={css.wrap}>
        <div className={css.header}>
          <h1 className={css.title}>출근부 관리</h1>
          <p className={css.subtitle}>직원 출퇴근을 관리하세요</p>
        </div>

        <div className={css.searchSection}>
          <div className={css.searchCard}>
            <div className={css.formGroup}>
              <Select
                label="현장 선택"
                placeholder="현장을 선택하세요"
                data={siteInfo?.map((d) => ({
                  label: d.siteNm,
                  value: d.siteNm,
                }))}
                disabled={isSiteInfoPending}
                onChange={(value) => {
                  const d = siteInfo?.find((d) => d.siteNm === value);
                  setCorpCd(d?.corpCd || "");
                  setMastCorpCd(d?.mastCorpCd || "");
                }}
                className={css.select}
              />
            </div>

            <div className={css.formGroup}>
              <TextInput
                label="사용자 ID"
                placeholder="사용자ID를 입력하세요"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className={css.textInput}
              />
            </div>

            <Button onClick={handleSearch} className={css.searchButton} size="lg">
              🔍 조회하기
            </Button>
          </div>
        </div>
        <div className={css.employeeList}>
          {attList?.map((d) => (
            <div key={d.userId} className={css.employeeCard}>
              <div className={css.employeeHeader}>
                <div className={css.employeeAvatar}>
                  {d.bigTxt ? (
                    <Image
                      src={`data:image/jpeg;base64,${d.bigTxt}`}
                      alt={d.userNm || "User"}
                      className={css.avatarImage}
                      width={56}
                      height={56}
                      unoptimized
                    />
                  ) : (
                    <span>{d.userNm?.charAt(0) || "?"}</span>
                  )}
                </div>
                <div className={css.employeeInfo}>
                  <h3 className={css.employeeName}>{d.userNm}</h3>
                  <p className={css.employeeId}>ID: {d.userId}</p>
                </div>
                <div className={css.statusBadge}>
                  {d.bigTxt ? (
                    <span className={css.registered}>등록됨</span>
                  ) : (
                    <span className={css.unregistered}>미등록</span>
                  )}
                </div>
              </div>

              <div className={css.employeeDetails}>
                {/* <div className={css.detailRow}>
                  <span className={css.detailLabel}>회사코드</span>
                  <span className={css.detailValue}>{d.corpCd}</span>
                </div> */}
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>직종</span>
                  <span className={`${css.detailValue} ${css.instCdValue}`}>{d.instCd}</span>
                </div>
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>일당</span>
                  <span className={`${css.detailValue} ${css.ordrPrcValue}`}>
                    {d.ordrPrc ? `${Number(d.ordrPrc).toLocaleString()}원` : "미설정"}
                  </span>
                </div>
                {/* <div className={css.detailRow}>
                  <span className={css.detailLabel}>작업기간</span>
                  <span className={css.detailValue}>
                    {dayjs(d.wrkStrDd).format("YYYY-MM-DD")} ~{" "}
                    {dayjs(d.wrkEndDd).format("YYYY-MM-DD")}
                  </span>
                </div>
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>계약여부</span>
                  <span
                    className={`${css.detailValue} ${d.cntr ? css.contractYes : css.contractNo}`}
                  >
                    {d.cntr ? "계약" : "미계약"}
                  </span>
                </div>
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>보험여부</span>
                  <span
                    className={`${css.detailValue} ${d.ins ? css.contractYes : css.contractNo}`}
                  >
                    {d.ins ? "계약" : "미계약"}
                  </span>
                </div> */}
              </div>

              <div className={css.actionButtons}>
                <button
                  className={`${css.actionButton} ${css.checkInButton}`}
                  disabled={d.bigTxt === ""}
                  onClick={() => onClickAttBtn("I", d.mastCorpCd, d.corpCd, d.userId)}
                >
                  <span>출근</span>
                </button>

                <button
                  className={`${css.actionButton} ${css.checkOutButton}`}
                  disabled={d.bigTxt === ""}
                  onClick={() => onClickAttBtn("O", d.mastCorpCd, d.corpCd, d.userId)}
                >
                  <span>퇴근</span>
                </button>

                {/* <button
                  className={`${css.actionButton} ${css.locationButton}`}
                  onClick={async () => {
                    if (!!window.ReactNativeWebView) {
                      const result = await sendMessageToDevice<{
                        message: string;
                        location: {
                          timestamp: number;
                          coords: {
                            longitude: number;
                            latitude: number;
                            heading: number;
                            accuracy: number;
                            altitude: number;
                            altitudeAccuracy: number;
                            speed: number;
                          };
                        };
                      }>({
                        type: "getDeviceLocation",
                        payload: null,
                        timeout: "infinity",
                      });

                      if (!result.location) return;

                      nativeLogger(JSON.stringify(result, null, 2));          
                      nativeAlert(
                        `${result.message} \n x: ${result.location.coords.longitude} \n y: ${result.location.coords.latitude}`,
                      );
                    } else {
                      nativeAlert("APP을 찾을 수 없습니다.");
                    }
                  }}
                >
                  <span>위치</span>
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <LoadingOverlay visible={isSiteInfoPending} />
    </>
  );
};

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
