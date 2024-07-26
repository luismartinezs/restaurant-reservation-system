import { SimpleGrid } from "@mantine/core";
import { api as ratingsApi } from "@/app/features/ratings";
import { api as reservationsApi } from "@/app/features/reservations";
import { api } from "../api";
import { FilteredRestaurants } from "./FilteredRestaurants";

export async function RestaurantList() {
  const { getAllRestaurants } = await api();
  const restaurants = await getAllRestaurants();
  const ratings = await (await ratingsApi()).getAll();
  const reservations = await (await reservationsApi()).getAll();

  return (
    <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }}>
      <FilteredRestaurants
        restaurants={restaurants}
        reservations={reservations}
        ratings={ratings}
      />
    </SimpleGrid>
  );
}
