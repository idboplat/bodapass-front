import CrewFaceHome from "@/components/authorization/crew-face-home";
import { Authorized } from "@/libraries/auth/authorized";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
  title: string;
};

// http://localhost:3000/ko/authorization/crew/[userId]/face
export default function CrewFaceRegisterPage({ title }: Props) {
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
          <CrewFaceHome />
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

  const title = isNext ? "얼굴등록" : "얼굴수정";

  return {
    props: {
      title,
    },
  };
};
