"use client";
import { Session } from "next-auth";

interface DataObserverProps {
  session: Session;
}

export default function DataObserver({ session }: DataObserverProps) {
  // const pathname = usePathname();
  // const router = useRouter();

  // const pathcorpGrpTp = pathname.split("/")[1];
  // const corpTp = session.user.corpGrpTp;

  // useEffect(() => {
  //   if (corpTp !== pathcorpGrpTp) {
  //     router.replace("/notAuthorized");
  //   }
  // }, [router, corpTp, pathcorpGrpTp]);

  // return null;

  return null;
}
