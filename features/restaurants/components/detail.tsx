import { notFound } from "next/navigation";
import { api } from "../api";
import { RestaurantCard } from "./RestaurantCard";

export async function Detail({ id }: { id: number }) {
  const { getRestaurantById } = api();
  try {
    const restaurant = await getRestaurantById(id);

    return <RestaurantCard restaurant={restaurant} />;
  } catch (err) {
    notFound();
  }
}
