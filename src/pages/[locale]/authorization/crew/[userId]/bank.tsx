import CrewBankHome from "@/components/authorization/crew-bank-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";
import Head from "next/head";
import { GetServerSideProps } from "next";

type Props = {
  title: string;
};

// http://localhost:3000/ko/authorization/crew/[userId]/bank
export default function CrewBankRegisterPage({ title }: Props) {
  const router = useRouter();

  return (
    <>
      {/* SSR */}
      <Head>
        <title>{title}</title>
      </Head>

      {!router.isReady ? (
        <div>Loading...</div>
      ) : (
        <Authorized>
          <CrewBankHome />
        </Authorized>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  Props,
  { locale: string; next: string }
> = async (context) => {
  const locale = context.params?.locale?.toString() || "ko";
  const isNext = context.params?.next?.toString() === "true";

  const title = isNext ? "계좌등록" : "계좌수정";

  return {
    props: {
      title,
    },
  };
};
