"use client";

import { SubmitButton } from "@/common/components/SubmitButton";
import { googleSignIn, signIn, signUp } from "../actions";
import { Divider, PasswordInput, TextInput } from "@mantine/core";
import { FaGoogle } from "react-icons/fa";
import { useFormState } from "react-dom";

export function LoginForm({
  searchParams,
}: {
  searchParams: { message: string; redirect: string };
}) {
  const { message, redirect } = searchParams;
  const signupWithPayload = signUp.bind(null, {
    redirect,
  });
  const signinWithPayload = signIn.bind(null, {
    redirect,
  });
  const googleSigninWithPayload = googleSignIn.bind(null, {
    redirect,
  });
  const [_s1, formActionSignUp] = useFormState(signupWithPayload, null);
  const [_s2, formActionSignIn] = useFormState(signinWithPayload, null);
  const [_s3, formActionGoogleSignIn] = useFormState(
    googleSigninWithPayload,
    null
  );

  return (
    <>
      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <TextInput
          type="email"
          label="Email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton formAction={formActionSignIn}>Sign In</SubmitButton>
        <SubmitButton formAction={formActionSignUp}>Sign Up</SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <Divider label="OR" my={10} />
      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <SubmitButton formAction={formActionGoogleSignIn}>
          <div className="flex gap-1">
            <span>Sign In with Google</span>
            <FaGoogle />
          </div>
        </SubmitButton>
      </form>
    </>
  );
}
