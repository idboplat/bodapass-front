import Header from "@/components/common/header";
import { nativeAlert, sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import css from "./index.module.scss";
import { clsx } from "clsx";
import Lottie from "lottie-react";
import landingAni from "/public/assets/lottie/landing.json";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";
import { nativeLogger } from "@/hooks/use-device-api";
import { useQuery } from "@tanstack/react-query";
import { callTms, StringRspnData } from "@/libraries/call-tms";

export default function Page() {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: session } = useSession();

  const onClick = async () => {
    try {
      if (!!window.ReactNativeWebView) {
        const result = await sendMessageToDevice({
          type: "test",
          payload: { message: "hello" },
        });

        nativeLogger("result === ");
        nativeLogger(JSON.stringify(result, null, 2));
      }
    } catch (error) {
      nativeLogger("error response === ");
      nativeLogger(error instanceof Error ? error.message : String(error));
    }
  };

  const onClick2 = () => {
    nativeAlert("test");
  };

  // nativeLogger(JSON.stringify(session, null, 2));

  // const { data: query2 } = useQuery({
  //   queryKey: ["image"],
  //   queryFn: async () => {
  //     const res = await callTms<StringRspnData<2>>({
  //       svcId: "TCW000001SSQ01",
  //       session: null,
  //       locale: "ko",
  //       data: ["USER_2580000021", "minwook"],
  //       pathName: "r2_bucket",
  //     });

  //     const data = res.svcRspnData?.[0];

  //     if (!data) throw new Error("FCM999");

  //     return data;
  //   },
  // });

  return (
    <div className={"mobileLayout"}>
      <Header />
      <main className={clsx(css.main)}>
        <Lottie animationData={landingAni} loop />
        {/* {query2?.F02 && (
          <img
            src={`data:image/jpeg;base64,${query2.F02}`}
            alt="image"
            style={{ width: "400px", height: "400px" }}
          />
        )} */}
      </main>
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
