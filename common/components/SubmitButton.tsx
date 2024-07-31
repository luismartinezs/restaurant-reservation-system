"use client";

import { Button, ButtonProps, Loader } from "@mantine/core";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps extends ButtonProps {}

export function SubmitButton({
  children,
  formAction,
  ...otherProps
}: SubmitButtonProps & React.ComponentPropsWithoutRef<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      formAction={formAction}
      {...otherProps}
    >
      {pending ? <Loader type="dots" color="white" /> : children}
    </Button>
  );
}
