import { Home } from "@/components/attendance/home";
import { Authorized } from "@/libraries/auth/authorized";
import { getStaticPaths, makeStaticProps } from "@/libraries/i18n/get-static";
import { useRouter } from "next/router";

export default function AttendancePage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <div className={"mobileLayout"}>
        <Home />
      </div>
    </Authorized>
  );
}

const getStaticProps = makeStaticProps(["common"]);
export { getStaticPaths, getStaticProps };
