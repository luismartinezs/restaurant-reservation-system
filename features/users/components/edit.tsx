import { notFound } from "next/navigation";
import { adminApi } from "../api";
import { Form } from "./Form";
import invariant from "tiny-invariant";

export async function Edit({ id }: { id: string }) {
  const { getById } = adminApi();
  try {
    const {
      data: { user },
      error,
    } = await getById(id);

    invariant(user, "User not found");

    return <Form initialData={user} />;
  } catch (err) {
    notFound();
  }
}
