export type TOCR = "idcard" | "driver" | "passport" | "passport-overseas" | "alien" | "alien-back";

export type TScannedResult = {
  name: string;
  id1: string;
  id2: string;
  image: Blob;
  type: "1" | "2" | "3";
};

export type TBankForm = {
  bankCd: string;
  bankNm: string;
  bankAccountNo: string;
};
