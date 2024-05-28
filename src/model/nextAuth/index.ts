import { Credentials } from "@/type/nextAuth";
import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn, session, jwt } from "@/model/nextAuth/callbacks";
import { credentialAuthorize } from "@/model/nextAuth/providers";

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
  events: {},
  pages: {
    signIn: "/login",
    // error: "/login/denied",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXT_PUBLIC_ENABLE_NEXT_AUTH_DEBUG === "true",
  session: {
    maxAge: 60 * 60, // 1시간
  },
  jwt: {
    maxAge: 60 * 60, // 1시간
  },
};

export const getServerSessionWithOptions = () => getServerSession(authOptions);

export default authOptions;
