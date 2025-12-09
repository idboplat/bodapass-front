import CompareHome from "@/components/attendance/compare-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function CompareOutPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CompareHome attCd="O" />
    </Authorized>
  );
}
