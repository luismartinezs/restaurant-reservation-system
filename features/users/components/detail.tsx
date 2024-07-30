import { notFound } from "next/navigation";
import { adminApi } from "../api";
import { Card } from "./Card";
import { DeleteButton } from "./DeleteButton";
import { KEY } from "../constants";
import invariant from "tiny-invariant";

export async function Detail({ id }: { id: string }) {
  const { getById } = adminApi();
  try {
    const {
      data: { user },
      error,
    } = await getById(id);

    if (error) throw error;

    invariant(user, "User not found");

    return (
      <Card
        item={user}
        deleteButton={
          <DeleteButton
            id={id}
            variant="subtle"
            redirectPath={`/scaffold/${KEY}/list`}
          />
        }
      />
    );
  } catch (err) {
    notFound();
  }
}
