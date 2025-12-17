import { TIdTp, TLoginTp, TWrkTp } from "@/types/common";
import { createContext, use } from "react";

type TSignupContext = {
  wrkTp: TWrkTp;
  loginTp: TLoginTp;
  idTp: TIdTp;
  brkrId: string;
  socialLoginSession: {
    code: string;
    externalId: string;
  } | null;
  saveImages: (images: Blob[]) => void;
  resetImages: () => void;
  images: Blob[];
  step: string;
  locale: string;
};

export const SignupCtx = createContext<TSignupContext | null>(null);

export const useSignupCtx = () => {
  const context = use(SignupCtx);
  if (!context) {
    throw new Error("useSignupContext must be used within a SignupProvider");
  }
  return context;
};

export const SignupProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: TSignupContext;
}) => {
  return <SignupCtx value={value}>{children}</SignupCtx>;
};
