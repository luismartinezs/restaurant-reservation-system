import { api } from "../api";
import { Id } from "../types";
import { RestaurantForm } from "./RestaurantForm";

export async function Update({ id }: { id: Id }) {
  const { getRestaurantById } = api();
  const restaurant = await getRestaurantById(id);

  return <RestaurantForm initialData={restaurant} />;
}
