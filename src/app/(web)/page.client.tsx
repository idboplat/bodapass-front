"use client";
import Camera from "@/components/camera";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import landingAni from "@/assets/lottie/landing.json";
import css from "./page.module.scss";
import { clsx } from "clsx";
import { sendMessageToDevice } from '@/hooks/use-device-api';
import {Button} from '@mantine/core';
import {logger} from '@/apis/logger';

export default function Client() {
  const router = useRouter();

  const onClick = async () => {
    try{
    const result = await sendMessageToDevice({ 
      type: "test", 
      payload: { message: "hello" }
    })

    logger("result === ")
    logger(JSON.stringify(result, null, 2))
    } catch(error) {
      logger("error response === ")
      logger(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <main className={clsx(css.main)}>
      <Lottie animationData={landingAni} loop />
    </main>
  );
}
