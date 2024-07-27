import { Button, ButtonProps } from "@mantine/core";
import { api } from "../api";
import { Id } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { KEY } from "../constants";
import { handleDelete } from "../actions";

export function DeleteButton({
  id,
  redirectPath,
  ...props
}: { id: Id; redirectPath?: string } & ButtonProps) {
  return (
    <form>
      <Button
        type="submit"
        formAction={() => handleDelete(id, redirectPath)}
        color="red"
        {...props}
      >
        Delete
      </Button>
    </form>
  );
}
