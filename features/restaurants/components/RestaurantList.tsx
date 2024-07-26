import { SimpleGrid } from "@mantine/core";
import { RestaurantCard } from "./RestaurantCard";
import { api } from "../api";
import { api as ratingsApi } from "@/features/ratings";
import { getRestaurantsWithAvgRating } from "../utils";

export async function RestaurantList() {
  const { getAllRestaurants } = api();
  const restaurants = await getAllRestaurants();
  const ratings = await ratingsApi().getAll();

  const ratedRestaurants = getRestaurantsWithAvgRating(restaurants, ratings);

  return (
    <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }}>
      {ratedRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} rating={restaurant.avgRating} ratingCount={restaurant.ratingCount} />
      ))}
    </SimpleGrid>
  );
}
