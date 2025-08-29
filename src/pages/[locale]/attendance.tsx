import { nativeLogger } from "@/apis/native-logger";
import { Authorized } from "@/libraries/auth/authorized";
import { useSession } from "@/libraries/auth/use-session";
import { callTms, StringRspnData, tmsApi } from "@/libraries/call-tms";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import css from "./attendance.module.scss";
import { Button } from "@mantine/core";
import { toast } from "sonner";

const getEmployeesByCorpCd = async ({ session }: { session: Session }) => {
  // teamleader1@gmail.com 고정 테스트
  const result = await callTms<StringRspnData<10>>({
    svcId: "TCM200101SMQ01",
    session,
    locale: "ko",
    data: ["25800002", "25800005", ""],
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

  if (!session) throw new Error("Session is not found");

  const { data: query } = useQuery({
    queryKey: ["TCM200101SMQ01", session],
    queryFn: () => getEmployeesByCorpCd({ session }),
  });

  const { mutate: updateAttendance, isPending } = useMutation({
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

  return (
    <div className={css.wrap}>
      <div className={css.list}>
        {query?.map((d) => (
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
                loading={isPending}
                onClick={() =>
                  updateAttendance({
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
                loading={isPending}
                onClick={() =>
                  updateAttendance({
                    masterCorpCd: d.mastCorpCd,
                    corpCd: d.corpCd,
                    userId: d.userId,
                    attCd: "O",
                  })
                }
              >
                퇴근
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
