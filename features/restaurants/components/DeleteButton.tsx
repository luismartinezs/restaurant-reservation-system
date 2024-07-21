import { Button, ButtonProps } from "@mantine/core";
import { api } from "../api";
import { Id } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export function DeleteButton({
  id,
  redirectPath,
  ...props
}: { id: Id; redirectPath?: string } & ButtonProps) {
  async function handleDelete() {
    "use server";

    const { deleteRestaurant } = api();

    await deleteRestaurant(id);

    revalidatePath("/scaffold/restaurants/list");

    if (redirectPath) {
      redirect(redirectPath);
    }

    return "deleted";
  }

  return (
    <form>
      <Button type="submit" formAction={handleDelete} color="red" {...props}>
        Delete
      </Button>
    </form>
  );
}
