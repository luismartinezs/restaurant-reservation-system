import { notFound } from "next/navigation";
import { api } from "../api";
import { Card } from "./Card";
import { DeleteButton } from "./DeleteButton";

export async function Detail({ id }: { id: number }) {
  const { getById } = api();
  try {
    const reservation = await getById(id);

    return <Card item={reservation} deleteButton={<DeleteButton id={id} variant="subtle" redirectPath="/scaffold/restaurants/list" />} />;
  } catch (err) {
    notFound();
  }
}
