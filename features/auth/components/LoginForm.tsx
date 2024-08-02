import { SubmitButton } from "@/common/components/SubmitButton";
import { googleSignIn, signIn, signUp } from "../actions";
import { Divider, PasswordInput, TextInput } from "@mantine/core";
import { FaGoogle } from "react-icons/fa";

export function LoginForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
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
        <SubmitButton formAction={signIn}>Sign In</SubmitButton>
        <SubmitButton formAction={signUp}>Sign Up</SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <Divider label="OR" my={10} />
      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        <SubmitButton formAction={googleSignIn}>
          <div className="flex gap-1">
            <span>Sign In with Google</span>
            <FaGoogle />
          </div>
        </SubmitButton>
      </form>
    </>
  );
}
