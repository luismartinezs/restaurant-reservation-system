import { SubmitButton } from "@/common/components/SubmitButton";
import { signIn, signUp } from "../actions";
import { PasswordInput, TextInput } from "@mantine/core";

export function LoginForm({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
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
      <SubmitButton
        formAction={signIn}
        className="bg-green-700 rounded-md px-4 py-2 text-foreground"
      >
        Sign In
      </SubmitButton>
      <SubmitButton
        formAction={signUp}
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground"
      >
        Sign Up
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
