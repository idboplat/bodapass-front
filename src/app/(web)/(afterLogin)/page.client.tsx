"use client";
import Camera from "@/components/Camera";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import landingAni from "@/assets/lottie/landing.json";
import css from "./page.module.scss";
import { clsx } from "clsx";

export default function Client() {
  const router = useRouter();

  return (
    <main className={clsx(css.main)}>
      <Lottie animationData={landingAni} loop />
    </main>
  );
}
