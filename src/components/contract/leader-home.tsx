import { useSession } from "@/libraries/auth/use-session";
import { Conclude } from "./leader-conclude";
import { TContractDto } from "./dto";
import { useDto } from "@/hooks/use-dto";
import Redirect from "../common/redirect";

export function LeaderContractHome() {
  const { mastCorpCd, corpCd, userId } = useDto<TContractDto>();
  const { data: session } = useSession();

  if (!session) throw new Error("FW999");

  if (!mastCorpCd || !corpCd || !userId) {
    return <Redirect to="/not-found" />;
  }

  return <Conclude session={session} dto={{ mastCorpCd, corpCd, userId }} />;
}
