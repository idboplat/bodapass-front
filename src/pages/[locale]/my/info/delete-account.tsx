import { Authorized } from "@/libraries/auth/authorized";
import { useRouter } from "next/router";
import DeleteAccountHome from "./delete-account-home";

export default function DeleteAccountPage() {
  const router = useRouter();

  if (!router.isReady) return <div>Loading...</div>;

  return (
    <Authorized>
      <DeleteAccountHome />
    </Authorized>
  );
}
