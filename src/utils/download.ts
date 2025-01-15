import { v1 as uuid } from "uuid";

export const downloadImage = (bytes: Uint8Array<ArrayBufferLike>) => {
  const uni8Array = new Uint8Array(bytes);
  const blob = new Blob([uni8Array], { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${uuid()}.jpg`;
  document.body.appendChild(a); // 일부 브라우저에서는 DOM에 추가해야 동작
  a.click();

  const img = document.createElement("img");
  img.src = url;
  // img.style.width = "800px";
  document.body.appendChild(img);

  setTimeout(() => {
    // URL.revokeObjectURL(url); // 메모리 누수 방지
    // document.body.removeChild(a);
  }, 100);
};
