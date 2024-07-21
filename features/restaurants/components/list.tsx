import { getAllRestaurants } from "../api";

export async function List() {
  const restaurants = await getAllRestaurants()

  return (
    <pre>{JSON.stringify(restaurants, null, 2)}</pre>
  )
}