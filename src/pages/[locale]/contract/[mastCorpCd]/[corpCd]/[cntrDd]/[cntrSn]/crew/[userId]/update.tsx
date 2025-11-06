import CrewUpdateHome from "@/components/contract/crew-update-home";
import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";

export default function WorkerUpdate() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <CrewUpdateHome />
    </Authorized>
  );
}
