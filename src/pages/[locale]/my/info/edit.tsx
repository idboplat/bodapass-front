import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import InfoEditHome from "./edit-home";

export default function InfoEditPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <InfoEditHome />
    </Authorized>
  );
}
