import { OCRResponseData } from "@/types/api/clova";
import { useEffect, useRef } from "react";
import hljs from "highlight.js";

interface ResultProps {
  data: OCRResponseData;
}

declare global {
  interface Window {
    hljs: any;
  }
}

export default function Result({ data }: ResultProps) {
  const jsonRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    jsonRef.current.innerHTML = JSON.stringify(data, null, 2);
    hljs.highlightElement(jsonRef.current);
  }, [data]);

  return (
    <pre className="scroll">
      <code className="json" ref={jsonRef}></code>
    </pre>
  );
}

// <div className="json-viewer">
//   <div dangerouslySetInnerHTML={{ __html: html }}></div>
// </div>
