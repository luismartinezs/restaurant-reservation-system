import { Edit } from "@/features/users";
import invariant from "tiny-invariant";

export default function EditPage({ params }: { params: { id: string } }) {
  invariant(params.id, "params.id is required");
  const id = Number(params.id);
  invariant(id, "params.id must be a number");

  return <Edit id={id} />;
}