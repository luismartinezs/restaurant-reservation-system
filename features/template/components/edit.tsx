import { notFound } from "next/navigation";
import { api } from "../api";
import { Form } from "./Form";

export async function Edit({ id }: { id: number }) {
  const { getById } = api();
  try {
    const item = await getById(id);

    return <Form initialData={item} />;
  } catch (err) {
    notFound();
  }
}
