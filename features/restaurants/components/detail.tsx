import { notFound } from "next/navigation";
import { api } from "../api";
import { RestaurantCard } from "./RestaurantCard";
import { DeleteButton } from "./DeleteButton";

export async function Detail({ id }: { id: number }) {
  const { getRestaurantById } = api();
  try {
    const restaurant = await getRestaurantById(id);

    return <RestaurantCard restaurant={restaurant} deleteButton={<DeleteButton id={id} variant="subtle" redirectPath="/scaffold/restaurants/list" />} />;
  } catch (err) {
    notFound();
  }
}
