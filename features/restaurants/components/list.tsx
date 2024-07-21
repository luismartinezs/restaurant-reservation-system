
import { api } from "../api";
import { RestaurantList } from "./RestaurantList";

export async function List() {
  const { getAllRestaurants } = api()
  const restaurants = await getAllRestaurants()

  return (
    <RestaurantList restaurants={restaurants} />
  )
}

