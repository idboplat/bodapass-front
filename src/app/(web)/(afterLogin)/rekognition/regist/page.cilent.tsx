"use client";
import BackHeader from "@/components/common/header/BackHeader";
import LivenessDetector from "@/components/liveness/LivenessDetector";
import { useRouter } from "next/navigation";
import css from "./page.module.scss";
import classNames from "classnames";
import { useState } from "react";
import { useSinglePage } from "@/hooks/useSinglePage";
import RegistForm from "@/components/liveness/RegistForm";
import { TRegistInfo } from "@/types/common";
import RegistResult from "@/components/liveness/RegistResult";
import { LivenessError } from "@/libraries/error";

const START_PAGE = 0;
const LAST_PAGE = 3;

export default function Client() {
  const router = useRouter();
  const { page, nextPage, prevPage, resetPage } = useSinglePage({
    start: START_PAGE,
    max: LAST_PAGE,
  });
  const [info, setInfo] = useState<TRegistInfo>({
    userName: "",
    collectionId: "",
  });

  const onClickBack = () => {
    if (page > 0) {
      prevPage();
      return;
    }

    router.back();
  };

  const updateInfo = (state: TRegistInfo) => {
    setInfo(() => ({ ...state }));
    nextPage();
  };

  const onSuccessDetector = (image: Blob) => {
    console.log("liveness image", image);
  };
  const onErrorDetector = (error: LivenessError) => {
    console.error(error);
  };
  const onUserCancelDetector = () => {
    console.log("user cancel");
    resetPage();
  };

  return (
    <>
      <BackHeader title="Registration" onClickBack={onClickBack} />
      <div className={classNames(css.wrap, "scroll")}>
        {page === 0 && <RegistForm info={info} updateInfo={updateInfo} />}
        {page === 1 && (
          <LivenessDetector
            onSuccess={onSuccessDetector}
            onError={onErrorDetector}
            onUserCancel={onUserCancelDetector}
          />
        )}
        {page === 3 && <RegistResult />}
      </div>
    </>
  );
}
