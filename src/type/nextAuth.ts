import { Account, CallbacksOptions, EventCallbacks, Profile } from "next-auth";
import { CredentialsConfig } from "next-auth/providers/credentials";

export interface Credentials extends Record<string, any> {
  email: string;
  password: string;
}

export type CredentialAuthorize = CredentialsConfig<any>["authorize"];

export type CallbacksSignIn = CallbacksOptions<Profile, Account>["signIn"];

export type CallbacksSession = CallbacksOptions<Profile, Account>["session"];

export type CallbacksJwt = CallbacksOptions<Profile, Account>["jwt"];

export type EventCallbacksSignOut = EventCallbacks["signOut"];

export type newSession = updateSession;

export type updateSession = {
  type: "updateSession";
};
