import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import SearchHome from "@/components/attendance/search-home";

// const PADDING = 75;
// const SCALE = 1;

interface CaptureProps {
  attCd: "I" | "O" | "A";
  mastCorpCd: string;
  corpCd: string;
  userId: string;
  faceImgFile: string;
}

export default function Capture() {
  const router = useRouter();
  const { attCd, mastCorpCd, corpCd, userId, faceImgFile } = router.query;

  if (!router.isReady) {
    return <div>Loading...</div>;
  }

  return (
    <Authorized>
      {/* <SearchHome
        attCd={attCd as "I" | "O" | "A"}
        mastCorpCd={mastCorpCd as string}
        corpCd={corpCd as string}
        userId={userId as string}
        faceImgFile={faceImgFile as string}
      /> */}
      <SearchHome />
    </Authorized>
  );
}
