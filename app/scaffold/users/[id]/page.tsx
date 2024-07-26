import { Detail } from "@/app/features/users";
import invariant from "tiny-invariant";

export default function Page({ params }: { params: { id: string } }) {
  invariant(params.id, "params.id is required");

  return <Detail id={params.id} />;
}
