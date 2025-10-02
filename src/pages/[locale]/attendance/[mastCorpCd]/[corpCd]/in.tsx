import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import SearchHome from "@/components/attendance/search-home";
import { Button } from "@mantine/core";

export default function Capture() {
  const router = useRouter();

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <Authorized>
      <div className={"mobileLayout"}>
        <div>
          {/* TODO: 출근이 모두 완료되면 기기에 이벤트 전송 */}
          <Button>완료</Button>
        </div>
        <SearchHome attCd="I" />
      </div>
    </Authorized>
  );
}
