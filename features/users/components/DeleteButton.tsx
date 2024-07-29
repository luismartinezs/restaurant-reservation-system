import { Button, ButtonProps } from "@mantine/core";
import { adminApi } from "../api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { KEY } from "../constants";

export function DeleteButton({
  id,
  redirectPath,
  ...props
}: { id: string; redirectPath?: string } & ButtonProps) {
  async function handleDelete() {
    "use server";

    const { remove } = adminApi();

    await remove(id);

    revalidatePath(`/scaffold/${KEY}/list`);

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
