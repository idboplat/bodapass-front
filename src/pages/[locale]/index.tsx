import Header from "@/components/common/header";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import css from "./index.module.scss";
import { clsx } from "clsx";
import Lottie from "lottie-react";
import landingAni from "/public/assets/lottie/landing.json";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import { nativeLogger } from "@/apis/native-logger";
import { useQuery } from "@tanstack/react-query";
import { StringRspnData, tmsApi, TmsResponse } from "@/libraries/call-tms";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();

  const onClick = async () => {
    try {
      const result = await sendMessageToDevice({
        type: "test",
        payload: { message: "hello" },
      });

      nativeLogger("result === ");
      nativeLogger(JSON.stringify(result, null, 2));
    } catch (error) {
      nativeLogger("error response === ");
      nativeLogger(error instanceof Error ? error.message : String(error));
    }
  };

  const onClick2 = () => {
    alert("test");
  };

  // nativeLogger(JSON.stringify(session, null, 2));

  const { data: query2 } = useQuery({
    queryKey: ["image"],
    queryFn: () => {
      const json = tmsApi
        .post<TmsResponse<StringRspnData<2>>>("api/r2_load_img", {
          json: {
            apiTranKey: 1,
            apiLangCd: "KO",
            apiCorpCd: "25800000",
            apiUserId: "guest",
            svcRqstList: [
              {
                svcTranKey: 1,
                svcId: "TCM900001SSQ99",
                svcIntfcVer: "1.0.0",
                svcMdtyYn: true,
                svcRqstPageSize: 1,
                svcRqstPageSn: 1,
                svcRqstData: [{ F01: "test@25800000", F02: "test@25800000" }],
              },
            ],
          },
        })
        .json()
        .then((res) => res.svcRspnList[0].svcRspnData![0]);
      return json;
    },
  });

  return (
    <div className={"mobileLayout"}>
      <Header />
      <main className={clsx(css.main)}>
        <Lottie animationData={landingAni} loop />
        {query2?.F02 && (
          <img
            src={`data:image/png;base64,${query2.F02}`}
            alt="image"
            style={{ width: "400px", height: "400px" }}
          />
        )}
      </main>
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
