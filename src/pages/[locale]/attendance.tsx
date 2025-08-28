import { nativeLogger } from "@/apis/native-logger";
import { Authorized } from "@/libraries/auth/authorized";
import { useSession } from "@/libraries/auth/use-session";
import { callTms, StringRspnData, tmsApi } from "@/libraries/call-tms";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useQuery } from "@tanstack/react-query";

const getEmployeesByCorpCd = async ({ session }: { session: Session }) => {
  const result = await callTms<StringRspnData<10>>({
    svcId: "TCM200101SMQ01",
    session,
    locale: "ko",
    data: [session.corpCd, "25800005", session.userId],
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

  if (!session) throw new Error("Session is not found");

  const { data: query } = useQuery({
    queryKey: ["TCM200101SMQ01"],
    queryFn: () => getEmployeesByCorpCd({ session }),
  });

  const { data: query2 } = useQuery({
    queryKey: ["image"],
    queryFn: () => {
      const json = tmsApi
        .post("api/call_tms_svc", {
          json: {
            apiTranKey: 1,
            apiLangCd: "KO",
            apiCorpCd: session.corpCd,
            apiUserId: session.userId,
            svcRqstList: [
              {
                svcTranKey: 1,
                svcId: "TCM900001SSQ99",
                svcIntfcVer: "1.0.0",
                svcMdtyYn: true,
                svcRqstPageSize: 1,
                svcRqstPageSn: 1,
                svcRqstData: [{ F01: "25800005", F02: "25800005" }],
              },
            ],
          },
        })
        .json();
      nativeLogger(JSON.stringify(json, null, 2));
      return json;
    },
  });

  return <></>;
};

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
