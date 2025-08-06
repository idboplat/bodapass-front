import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18nConfig } from "/next-i18next.config";
import { GetServerSideProps, GetStaticProps } from "next";

export const getI18nPaths = () =>
  i18nConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng,
    },
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export const getI18nProps = async (
  ctx: Parameters<GetStaticProps | GetServerSideProps>[0],
  ns = ["common"],
) => {
  const locale = ctx?.params?.locale?.toString() || i18nConfig.i18n.defaultLocale;
  const translations = await serverSideTranslations(locale, ns, i18nConfig);
  return translations;
};

export const makeStaticProps =
  (ns: string[] = []): GetStaticProps =>
  async (ctx) => ({
    props: await getI18nProps(ctx, ns),
  });
