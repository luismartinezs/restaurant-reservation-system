import { api } from "../api";
import { Id } from "../types";
import { Form } from "./Form";

export async function Update({ id }: { id: Id }) {
  const { getById } = api();
  const restaurant = await getById(id);

  return <Form initialData={restaurant} />;
}
