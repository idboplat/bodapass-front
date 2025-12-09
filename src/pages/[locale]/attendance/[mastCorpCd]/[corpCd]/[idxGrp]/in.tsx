import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import SearchHome from "@/components/attendance/search-home";

export default function Capture() {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <Authorized>
      <SearchHome attCd="I" />
    </Authorized>
  );
}
