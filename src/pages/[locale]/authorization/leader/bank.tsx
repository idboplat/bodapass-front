import LeaderBankHome from "@/components/authorization/leader-bank-home";
import { useRouter } from "next/router";
import { Authorized } from "@/libraries/auth/authorized";
import { GetServerSideProps } from "next";
import Head from "next/head";

type Props = {
  title: string;
};

// http://localhost:3000/ko/authorization/leader/bank
export default function LeaderBankRegisterPage({ title }: Props) {
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
          <LeaderBankHome />
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
