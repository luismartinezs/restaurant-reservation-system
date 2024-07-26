import { SimpleGrid } from "@mantine/core";
import { RestaurantCard } from "./RestaurantCard";
import { api } from "../api";

export async function RestaurantList() {
  const { getAllRestaurants } = api();
  const restaurants = await getAllRestaurants();

  return (
    <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }}>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </SimpleGrid>
  );
}
