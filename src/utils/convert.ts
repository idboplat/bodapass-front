import { v1 as uuid } from "uuid";

export const bytesToBlob = (bytes: Uint8Array<ArrayBufferLike>) => {
  const values = Object.values(bytes);
  const uni8Array = new Uint8Array(values);

  const blob = new Blob([uni8Array], { type: "image/png" });
  return blob;
};
