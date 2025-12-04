import { useSession } from "@/libraries/auth/use-session";
import DeleteAccountForm from "./delete-account-form";
import { Authorized } from "@/libraries/auth/authorized";

export default function DeleteAccountHome() {
  const { data: session } = useSession();
  if (!session) throw new Error("FW401");

  return (
    <Authorized>
      <div className={"mobileLayout"}>
        <DeleteAccountForm session={session} />
      </div>
    </Authorized>
  );
}
