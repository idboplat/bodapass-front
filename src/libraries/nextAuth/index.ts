import { Credentials } from "@/types/nextAuth";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, session, jwt } from "@/libraries/nextAuth/callbacks";
import { credentialAuthorize } from "@/libraries/nextAuth/providers";
import { signOut } from "./events";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider<Credentials>({
      id: "emailLogin",
      name: "emailLogin",
      credentials: {} as any,
      authorize: credentialAuthorize,
    }),
  ],
  callbacks: {
    signIn,
    session,
    jwt,
  },
  events: { signOut },
  pages: {
    signIn: "/login",
    // error: "/login/denied",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1시간
  },
  jwt: {
    maxAge: 60 * 60, // 1시간
  },
};

export const getServerSessionWithOptions = () => getServerSession(authOptions);

export default authOptions;
