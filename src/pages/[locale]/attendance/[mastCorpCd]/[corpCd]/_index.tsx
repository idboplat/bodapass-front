//@ts-ignore
import { Home } from "@/components/attendance/home-asis";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

// asis
export default function AttendanceInPage() {
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
