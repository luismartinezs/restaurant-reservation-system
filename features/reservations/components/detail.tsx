import { notFound } from "next/navigation";
import { api } from "../api";
import { Card } from "./Card";
import { DeleteButton } from "./DeleteButton";
import { KEY } from "../constants";

export async function Detail({ id }: { id: number }) {
  const { getById } = api();
  try {
    const item = await getById(id);

    return (
      <Card
        item={item}
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
