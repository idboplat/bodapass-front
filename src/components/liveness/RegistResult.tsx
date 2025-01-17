import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import { IndexFacesCommandOutput } from "@aws-sdk/client-rekognition";

type Props = {
  result: { message: string; data: string; response: IndexFacesCommandOutput };
};

export default function RegistResult({ result }: Props) {
  const jsonRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    jsonRef.current.innerHTML = JSON.stringify(result, null, 2);
    hljs.highlightElement(jsonRef.current);
  }, [result]);

  return (
    <pre>
      <code className="json" ref={jsonRef}></code>
    </pre>
  );
}
