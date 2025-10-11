import { useDto } from "@/hooks/use-dto";
import { TIdCardDto, TScannedResult } from "./dto";
import { useState } from "react";
import IdcardCamera from "./id-card-camera";
import IdCardForm from "./id-card-form";
import Redirect from "../common/redirect";

export default function IdcardHome() {
  const dto = useDto<TIdCardDto>();
  const [scannedResult, setScannedResult] = useState<TScannedResult | null>(null);

  const resetScanned = () => setScannedResult(null);
  const setScanned = (result: TScannedResult) => setScannedResult(() => result);

  if (!dto.brkrId) return <Redirect to="/not-found" />;

  return (
    <div className={"mobileLayout"}>
      {!!scannedResult ? (
        <IdCardForm resetScanned={resetScanned} scannedResult={scannedResult} brkrId={dto.brkrId} />
      ) : (
        <IdcardCamera scanned={setScanned} brkrId={dto.brkrId} />
      )}
    </div>
  );
}
