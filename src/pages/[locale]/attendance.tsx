import { nativeLogger } from "@/apis/native-logger";
import { Authorized } from "@/libraries/auth/authorized";
import { useSession } from "@/libraries/auth/use-session";
import { callTms, StringRspnData, tmsApi } from "@/libraries/call-tms";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./attendance.module.scss";
import { Button, LoadingOverlay, Select, Tabs, TextInput } from "@mantine/core";
import { toast } from "sonner";
import { useState } from "react";
import { sendMessageToDevice } from "@/hooks/use-device-api";

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
  const result = await callTms<StringRspnData<10>>({
    svcId: "TCM200101SMQ01",
    session,
    locale: "ko",
    data: [args.mastCorpCd, args.corpCd, args.userId],
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

  const [mastCorpCd, setMastCorpCd] = useState<string>("");
  const [corpCd, setCorpCd] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

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

  const { mutate: updateAtt, isPending: isUpdateAttPending } = useMutation({
    mutationFn: (args: {
      masterCorpCd: string;
      corpCd: string;
      userId: string;
      attCd: "I" | "O" | "A";
    }) =>
      callTms<StringRspnData<1>>({
        svcId: "TCM200101SSP01",
        session,
        locale: "ko",
        data: [args.masterCorpCd, args.corpCd, args.userId, args.attCd],
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["TCM200101SMQ01"] });
      toast.success("출퇴근 정보가 업데이트되었습니다.");
    },
  });

  const handleSearch = () => {
    queryClient.invalidateQueries({ queryKey: ["TCM200101SMQ01", session, mastCorpCd, corpCd] });
  };

  return (
    <>
      <div className={css.wrap}>
        {/* <Tabs>
        <Tabs.List>
          <Tabs.Tab value="I">출근</Tabs.Tab>
          <Tabs.Tab value="O">퇴근</Tabs.Tab>
        </Tabs.List>
      </Tabs> */}
        <div>
          <Select
            label="현장"
            placeholder="현장을 선택하세요."
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
            mb={15}
          />
        </div>
        <div>
          <TextInput
            label="사용자ID"
            placeholder="사용자ID를 입력하세요."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            mb={15}
          />
          <Button onClick={handleSearch}>조회</Button>
        </div>
        <div className={css.list}>
          {attList?.map((d) => (
            <div key={d.userId} className={css.item}>
              <div className={css.info}>
                <div>주_회사코드: {d.mastCorpCd}</div>
                <div>회사코드: {d.corpCd}</div>
                <div>사용자ID: {d.userId}</div>
                <div>종목_코드: {d.instCd}</div>
                <div>주문_가격: {d.ordrPrc}</div>
                <div>작업_시작_일자: {d.wrkStrDd}</div>
                <div>작업_종료_일자: {d.wrkEndDd}</div>
                <div>계약여부: {d.cntr ? "Y" : "N"}</div>
                <div>보험여부: {d.ins ? "Y" : "N"}</div>
                <div>사용자명: {d.userNm}</div>
              </div>

              <div className={css.buttonBox}>
                <Button
                  variant="filled"
                  color="blue"
                  data-type="in"
                  loading={isUpdateAttPending}
                  onClick={() =>
                    updateAtt({
                      masterCorpCd: d.mastCorpCd,
                      corpCd: d.corpCd,
                      userId: d.userId,
                      attCd: "I",
                    })
                  }
                >
                  출근
                </Button>
                <Button
                  variant="filled"
                  color="red"
                  data-type="out"
                  loading={isUpdateAttPending}
                  onClick={() =>
                    updateAtt({
                      masterCorpCd: d.mastCorpCd,
                      corpCd: d.corpCd,
                      userId: d.userId,
                      attCd: "O",
                    })
                  }
                >
                  퇴근
                </Button>
                <Button
                  variant="filled"
                  color="green"
                  data-type="out"
                  loading={isUpdateAttPending}
                  onClick={async () => {
                    if (window.ReactNativeWebView) {
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
                        timeout: "infinity", // 10초 이상 대기
                      });

                      if (!result.location) return; // 권한 설정 안됬을때

                      nativeLogger(JSON.stringify(result, null, 2));
                      alert(
                        `${result.message} \n x: ${result.location.coords.longitude} \n y: ${result.location.coords.latitude}`,
                      );
                    } else {
                      alert("APP을 찾을 수 없습니다.");
                    }
                  }}
                >
                  위치정보 조회
                </Button>
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
