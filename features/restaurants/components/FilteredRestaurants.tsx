"use client";

import { Read as RatingRead } from "@/features/ratings";
import { Read as ReservationRead } from "@/features/reservations";
import { useSearchQuery } from "@/features/search";

import {
  getAvailableRestaurants,
  getRestaurantsByCuisine,
  getRestaurantsByLocation,
  getRestaurantsWithAvgRating,
} from "../utils";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantRead } from "../types";
import { useMemo } from "react";
import { useFilterQuery } from "@/features/filters/hooks/useFilterQuery";

export function FilteredRestaurants({
  restaurants,
  reservations,
  ratings,
}: {
  restaurants: RestaurantRead[];
  reservations: ReservationRead[];
  ratings: RatingRead[];
}) {
  const { date, time, people } = useSearchQuery();
  const { cuisine, location } = useFilterQuery();

  const filteredRestaurants = useMemo(
    () =>
      getRestaurantsWithAvgRating(
        getAvailableRestaurants(
          getRestaurantsByCuisine(
            getRestaurantsByLocation(restaurants, location),
            cuisine
          ),
          reservations,
          {
            date,
            time,
            people,
          }
        ),
        ratings
      ),
    [date, time, people, restaurants, reservations, ratings, cuisine]
  );

  return (
    <>
      {filteredRestaurants.map(
        ({ avgRating, ratingCount, availableSeats, ...restaurant }) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            rating={avgRating}
            ratingCount={ratingCount}
            availableSeats={availableSeats}
          />
        )
      )}
    </>
  );
}
