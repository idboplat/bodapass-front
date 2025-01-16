"use client";
import BackHeader from "@/components/common/header/BackHeader";
import LivenessDetector from "@/components/liveness/LivenessDetector";
import { useRouter } from "next/navigation";
import css from "./page.module.scss";
import classNames from "classnames";

export default function Client() {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <>
      <BackHeader title="Registration" onClickBack={onClickBack} />
      <div className={classNames(css.wrap, "scroll")}>
        <LivenessDetector />
      </div>
    </>
  );
}
