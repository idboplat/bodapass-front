import { getI18nProps } from "@/libraries/i18n/get-static";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("not-found:0001")}</h1>
      <Link href="/">{t("not-found:0001")}</Link>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const translations = await getI18nProps(ctx, ["not-found", "common"]);

  return {
    props: {
      ...translations,
    },
  };
};
