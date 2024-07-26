import { Detail } from "@/app/features/restaurants";
import invariant from "tiny-invariant";

export default function Page({ params }: { params: { id: string } }) {
  invariant(params.id, "params.id is required");
  const id = Number(params.id);
  invariant(id, "params.id must be a number");

  return <Detail id={id} />;
}
