import { SimpleGrid } from "@mantine/core";

import { api as ratingsApi } from "@/features/ratings/server";
import { api as reservationsApi } from "@/features/reservations/server";

import { api } from "../api";
import { FilteredRestaurants } from "./FilteredRestaurants";
import { Suspense } from "react";
import { RestaurantCardSkeleton } from "./RestaurantCard";

export async function RestaurantList() {
  const { getAllRestaurants } = api();
  const restaurants = await getAllRestaurants();
  const ratings = await ratingsApi().getAll();
  const reservations = await reservationsApi().getAll();

  return (
    <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }}>
      <Suspense fallback={<div>Loading...</div>}>
        <FilteredRestaurants
          restaurants={restaurants}
          reservations={reservations}
          ratings={ratings}
        />
      </Suspense>
    </SimpleGrid>
  );
}

export function RestaurantListSkeleton() {
  return (
    <SimpleGrid cols={{ base: 2, sm: 2, lg: 4 }}>
      {
        Array.from({ length: 12 }).map((_, i) => (
          <RestaurantCardSkeleton key={i} />
        ))
      }
    </SimpleGrid>
  );
}
