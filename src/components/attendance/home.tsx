import { useSession } from "@/libraries/auth/use-session";
import { callTms, callWas, StringRspnData } from "@/libraries/call-tms";
import { Button, LoadingOverlay, SegmentedControl, Select, TextInput } from "@mantine/core";
import { useIsFetching, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import css from "./home.module.scss";
import { ChevronDown, ChevronUp, Loader } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

/** 현장 정보 조회 */
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

/** 팀원 출퇴근 목록 조회 */
const getEmployeesByCorpCd = async ({
  session,
  ...args
}: { session: Session } & {
  mastCorpCd: string;
  corpCd: string;
  userId: string;
}) => {
  // teamleader1@gmail.com 고정 테스트
  const result = await callWas<StringRspnData<14>>({
    session,
    apiPathName: "WCM200101SMQ01",
    formData: [],
    svcId: "TCM200101SMQ01",
    data: [args.mastCorpCd, args.corpCd, args.userId],
    locale: "ko",
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
    cntr: d.F08,
    ins: d.F09,
    userNm: d.F10,
    wrkStrDtm: d.F11,
    wrkEndDtm: d.F12,
    faceImgFile: d.F13,
    bigTxt: d.F14,
  }));
};

export const Home = () => {
  const { data: session } = useSession();
  if (!session) throw new Error("Session is not found");

  const queryClient = useQueryClient();
  const router = useRouter();

  const siteId = (router.query.siteId as string | undefined) || "";

  const [attCd, setAttCd] = useState<"A" | "I" | "O">("A");
  const [userId, setUserId] = useState<string>("");

  const { data: siteInfo, isPending: isSiteInfoPending } = useQuery({
    queryKey: ["TCM200100SMQ01", session, siteId],
    queryFn: () => getSiteInfo({ session }),
  });

  const currentSite = useMemo(
    () => siteInfo?.find((site) => site.corpCd === siteId),
    [siteInfo, siteId],
  );

  // 직원 목록 조회 쿼리 호출 수
  // 0보다 크면 가져오는 중
  const isAttListFetching = useIsFetching({ queryKey: ["TCM200101SMQ01"] });

  // 출퇴근 버튼, 출퇴근 필터링 세그먼트 표시 여부
  const isVisibleAttBtn = currentSite && isAttListFetching < 1;

  const handleSearch = () => {
    if (!isSiteInfoPending) return;

    queryClient.invalidateQueries({
      queryKey: ["TCM200101SMQ01", session, currentSite?.mastCorpCd, siteId],
    });
  };
  const onClickAttBtn = (
    attCd: "I" | "O" | "A",
    mastCorpCd: string,
    corpCd: string,
    // userId: string,
    // faceImgFile: string,
  ) => {
    const searchParams = new URLSearchParams();
    searchParams.set("attCd", attCd);
    searchParams.set("mastCorpCd", mastCorpCd);
    searchParams.set("corpCd", corpCd);
    // searchParams.set("userId", userId);
    // searchParams.set("faceImgFile", faceImgFile);

    router.push(`/ko/capture?${searchParams.toString()}`);
  };

  return (
    <>
      <div className={css.background} />
      <div className={css.wrap}>
        <div className={css.header}>
          <h1 className={css.title}>출근부 관리</h1>
          <p className={css.subtitle}>직원 출퇴근을 관리하세요</p>
        </div>

        <div className={css.searchSection}>
          <div className={css.searchCard}>
            <div className={css.formGroup}>
              <Select
                allowDeselect={false}
                label="현장 선택"
                placeholder="현장을 선택하세요"
                data={
                  siteInfo?.map((d) => ({
                    label: d.siteNm,
                    value: d.corpCd,
                  })) || []
                }
                disabled={isSiteInfoPending}
                value={siteId}
                onChange={(value) => {
                  router.push(`/ko/attendance/${value}`);
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

            <Button
              onClick={handleSearch}
              className={css.searchButton}
              size="lg"
              loading={isAttListFetching > 0}
              loaderProps={{
                size: "sm",
                type: "dots",
              }}
            >
              🔍 조회하기
            </Button>
          </div>
        </div>

        {isVisibleAttBtn && (
          <div className={css.segmentedControl}>
            <SegmentedControl
              data={[
                { label: "전체", value: "A" },
                { label: "출근", value: "I" },
                { label: "퇴근", value: "O" },
              ]}
              value={attCd}
              onChange={(value) => setAttCd(value as "A" | "I" | "O")}
            />
          </div>
        )}

        {currentSite && (
          <AttendanceList
            session={session}
            currentSite={currentSite}
            siteId={siteId}
            userId={userId}
            attCd={attCd}
          />
        )}
      </div>
      {isVisibleAttBtn && (
        <div className={css.attendanceControl}>
          <button onClick={() => router.push("/ko/capture")}>출근</button>
          <button onClick={() => router.push("/ko/capture")}>퇴근</button>
        </div>
      )}
      <LoadingOverlay visible={isSiteInfoPending} />
    </>
  );
};

const AttendanceList = ({
  session,
  currentSite,
  siteId,
  userId,
  attCd,
}: {
  session: Session;
  currentSite: {
    mastCorpCd: string;
    corpCd: string;
    siteNm: string;
  };
  siteId: string;
  userId: string;
  attCd: "A" | "I" | "O";
}) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggleCard = (userId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const onClickAttBtn = (
    attCd: "I" | "O" | "A",
    mastCorpCd: string,
    corpCd: string,
    userId: string,
    faceImgFile: string,
  ) => {
    const searchParams = new URLSearchParams();
    searchParams.set("attCd", attCd);
    searchParams.set("mastCorpCd", mastCorpCd);
    searchParams.set("corpCd", corpCd);
    searchParams.set("userId", userId);
    searchParams.set("faceImgFile", faceImgFile);

    router.push(`/ko/capture?${searchParams.toString()}`);
  };

  const { data: attList, isLoading: isAttListLoading } = useQuery({
    queryKey: ["TCM200101SMQ01", session, currentSite.mastCorpCd, siteId],
    queryFn: () =>
      getEmployeesByCorpCd({
        session,
        mastCorpCd: currentSite.mastCorpCd,
        corpCd: siteId,
        userId,
      }),
    enabled: !!currentSite.mastCorpCd && !!siteId,
  });

  // 필터링 로직
  const filteredAttList = useMemo(() => {
    if (!attList) return [];

    switch (attCd) {
      case "A": // 전체
        return attList;
      case "I": // 출근
        return attList.filter((d) => d.wrkStrDtm === "");
      case "O": // 퇴근
        return attList.filter((d) => d.wrkStrDtm !== "" && d.wrkEndDtm === "");
      default:
        return attList;
    }
  }, [attList, attCd]);

  return (
    <div className={css.employeeList}>
      {filteredAttList?.map((d) => {
        const isExpanded = expandedCards.has(d.userId);
        return (
          <div key={d.userId} className={css.employeeCard}>
            <div className={css.employeeHeader} onClick={() => toggleCard(d.userId)}>
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
              {/* <div className={css.statusBadge}>
              {d.bigTxt ? (
                <span className={css.registered}>등록됨</span>
              ) : (
                <span className={css.unregistered}>미등록</span>
              )}
            </div> */}
              <div className={css.expandIcon}>{isExpanded ? <ChevronUp /> : <ChevronDown />}</div>
            </div>

            {isExpanded && (
              <>
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
                    className={`${css.detailValue} ${d.cntr === "Y" ? css.contractYes : css.contractNo}`}
                  >
                    {d.cntr ? "계약" : "미계약"}
                  </span>
                </div>
                <div className={css.detailRow}>
                  <span className={css.detailLabel}>보험여부</span>
                  <span
                    className={`${css.detailValue} ${d.ins === "Y" ? css.contractYes : css.contractNo}`}
                  >
                    {d.ins ? "계약" : "미계약"}
                  </span>
                </div> */}
                </div>

                {/* <div className={css.actionButtons}>
                  {d.wrkStrDtm === "" && (
                    <button
                      className={`${css.actionButton} ${css.checkInButton}`}
                      disabled={d.wrkStrDtm !== ""}
                      onClick={() =>
                        onClickAttBtn("I", d.mastCorpCd, d.corpCd, d.userId, d.faceImgFile)
                      }
                    >
                      <span>출근</span>
                    </button>
                  )}

                  {d.wrkStrDtm !== "" && d.wrkEndDtm === "" && (
                    <button
                      className={`${css.actionButton} ${css.checkOutButton}`}
                      disabled={d.wrkStrDtm === "" || d.wrkEndDtm !== ""}
                      onClick={() =>
                        onClickAttBtn("O", d.mastCorpCd, d.corpCd, d.userId, d.faceImgFile)
                      }
                    >
                      <span>퇴근</span>
                    </button>
                  )}

                  <button
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
                </button>
                </div> */}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
