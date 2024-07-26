"use client";

import { Read as RatingRead } from "@/app/features/ratings";
import { Read as ReservationRead } from "@/app/features/reservations";
import { useSearchQuery } from "@/app/features/search";

import { getAvailableRestaurants, getRestaurantsWithAvgRating } from "../utils";
import { RestaurantCard } from "./RestaurantCard";
import { RestaurantRead } from "../types";
import { useMemo } from "react";

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

  const filteredRestaurants = useMemo(
    () =>
      getRestaurantsWithAvgRating(
        getAvailableRestaurants(restaurants, reservations, {
          date,
          time,
          people,
        }),
        ratings
      ),
    [date, time, people, restaurants, reservations, ratings]
  );

  return (
    <>
      {filteredRestaurants.map(({ avgRating, ratingCount, availableSeats, ...restaurant }) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          rating={avgRating}
          ratingCount={ratingCount}
          availableSeats={availableSeats}
          alwaysShowAvailableSeats
        />
      ))}
    </>
  );
}
