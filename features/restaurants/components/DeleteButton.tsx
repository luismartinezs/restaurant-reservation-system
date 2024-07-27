import { Button, ButtonProps } from "@mantine/core";
import { Id } from "../types";
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
