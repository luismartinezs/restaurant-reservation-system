import { Edit } from "@/app/features/users";
import invariant from "tiny-invariant";

export default function EditPage({ params }: { params: { id: string } }) {
  invariant(params.id, "params.id is required");

  return <Edit id={params.id} />;
}