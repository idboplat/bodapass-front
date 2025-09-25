import { Home } from "@/components/attendance/home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function AttendancePage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <div>
        <Home />
      </div>
    </Authorized>
  );
}
