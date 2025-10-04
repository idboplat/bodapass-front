import { useRef, useState, useCallback, useEffect } from "react";

// 공통 이벤트 타입 정의
export type CanvasEvent = React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>;
export type CanvasEventHandler = (e: CanvasEvent) => void;
export type SimpleEventHandler = () => void;

// 이벤트 핸들러 그룹
export interface CanvasEventHandlers {
  onMouseDown: CanvasEventHandler;
  onMouseMove: CanvasEventHandler;
  onMouseUp: SimpleEventHandler;
  onMouseLeave: SimpleEventHandler;
  onTouchStart: CanvasEventHandler;
  onTouchMove: CanvasEventHandler;
  onTouchEnd: SimpleEventHandler;
}

interface UseSignatureOptions {
  width: number;
  height: number;
  onSignatureChange?: (signatureData: string | null) => void;
}

export function useSignature({ width, height, onSignatureChange }: UseSignatureOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signatureData, setSignatureData] = useState<string | null>(null);

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 캔버스 초기 설정
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // 캔버스 배경을 투명하게 설정 (서명만 저장하기 위해)
    ctx.clearRect(0, 0, width, height);
  }, [width, height]);

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      setIsDrawing(true);
      setHasSignature(true);

      const rect = canvas.getBoundingClientRect();
      const x =
        (e as React.MouseEvent).clientX - rect.left ||
        (e as React.TouchEvent).touches[0].clientX - rect.left;
      const y =
        (e as React.MouseEvent).clientY - rect.top ||
        (e as React.TouchEvent).touches[0].clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
    },
    [],
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x =
        (e as React.MouseEvent).clientX - rect.left ||
        (e as React.TouchEvent).touches[0].clientX - rect.left;
      const y =
        (e as React.MouseEvent).clientY - rect.top ||
        (e as React.TouchEvent).touches[0].clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [isDrawing],
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);

    // 서명 데이터를 부모 컴포넌트에 전달
    const canvas = canvasRef.current;
    if (canvas && onSignatureChange) {
      const signatureData = canvas.toDataURL("image/png");
      setSignatureData(signatureData);
      onSignatureChange(signatureData);
    }
  }, [onSignatureChange]);

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    setHasSignature(false);
    setSignatureData(null);
    if (onSignatureChange) {
      onSignatureChange(null);
    }
  }, [width, height, onSignatureChange]);

  const saveSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    // 투명 배경으로 PNG 저장
    const signatureData = canvas.toDataURL("image/png");

    // 기본 다운로드 기능
    const link = document.createElement("a");
    link.download = `signature_${new Date().getTime()}.png`;
    link.href = signatureData;
    link.click();
  }, [hasSignature]);

  const getSignatureData = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.toDataURL("image/png");
  }, []);

  const eventHandlers: CanvasEventHandlers = {
    onMouseDown: startDrawing,
    onMouseMove: draw,
    onMouseUp: stopDrawing,
    onMouseLeave: stopDrawing,
    onTouchStart: startDrawing,
    onTouchMove: draw,
    onTouchEnd: stopDrawing,
  };

  return {
    canvasRef,
    isDrawing,
    hasSignature,
    signatureData,
    clearSignature,
    saveSignature,
    getSignatureData,
    eventHandlers,
  };
}
