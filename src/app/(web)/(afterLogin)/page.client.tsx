"use client";
import Camera from "@/components/Camera";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import landingAni from "@/assets/lottie/landing.json";
import css from "./page.module.scss";
import classNames from "classnames";

export default function Client() {
  const router = useRouter();

  return (
    <main className={classNames(css.main)}>
      <Lottie animationData={landingAni} loop />
    </main>
  );
}
