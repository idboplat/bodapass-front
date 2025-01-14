"use client";
import awsexports from "@/aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure(awsexports);

export default function AmplifyProvider() {
  return null;
}
