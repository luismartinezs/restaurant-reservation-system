import { api } from "../api";
import { RestaurantForm } from "./Form";

export async function Edit({ id }: { id: number }) {
  const { getRestaurantById } = api();
  const restaurant = await getRestaurantById(id);

  return <RestaurantForm initialData={restaurant} />;
}
