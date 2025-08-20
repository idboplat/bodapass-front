import { logger } from "@/apis/logger";
import Header from "@/components/common/header";
import { sendMessageToDevice } from "@/hooks/use-device-api";
import { useSession } from "@/libraries/auth/use-session";
import { useRouter } from "next/router";
import { useEffect } from "react";
import css from "./index.module.scss";
import { clsx } from "clsx";
import Lottie from "lottie-react";
import { Button } from "@mantine/core";
import landingAni from "/public/assets/lottie/landing.json";
import { makeStaticProps, getStaticPaths } from "@/libraries/i18n/get-static";
import { useTranslation } from "next-i18next";

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

      logger("result === ");
      logger(JSON.stringify(result, null, 2));
    } catch (error) {
      logger("error response === ");
      logger(error instanceof Error ? error.message : String(error));
    }
  };

  const onClick2 = () => {
    alert("test");
  };

  return (
    <div className={"mobileLayout"}>
      <Header />
      <main className={clsx(css.main)}>
        <Lottie animationData={landingAni} loop />
      </main>
    </div>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
