import { RefObject } from "react";
import css from "./signature-canvas.module.scss";
import { CanvasEventHandlers } from "@/hooks/use-signature";

interface Props extends CanvasEventHandlers {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width?: number;
  height?: number;
}

export function SignatureCanvas({ canvasRef, width = 200, height = 150, ...eventHandlers }: Props) {
  return (
    <div className={css.signatureContainer}>
      <div className={css.signatureLabel}>서명</div>
      <div className={css.canvasWrapper}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={css.signatureCanvas}
          {...eventHandlers}
        />
      </div>
    </div>
  );
}
