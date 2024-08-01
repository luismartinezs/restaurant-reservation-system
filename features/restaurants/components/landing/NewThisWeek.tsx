import React from "react";
import { Grid, GridCol, Text } from "@mantine/core";
import { RestaurantCard } from "./RestaurantCard";
import { api } from "../../api";
import { api as ratingsApi } from "@/features/ratings/api";
import { getRestaurantsWithAvgRating } from "../../utils";

export const NewThisWeek = async () => {
  const restaurants = await api().getAllRestaurants();
  const ratings = await ratingsApi().getAll();

  const restaurantsWithRatings = getRestaurantsWithAvgRating(
    restaurants,
    ratings
  )

  return (
    <div>
      <Text size="xl" fw={600}>
      New This Week
      </Text>
      <Text mb="lg">Bringing you new spots every week</Text>
      <Grid>
        {restaurantsWithRatings
          .slice(0, 5)
          .map(({ avgRating, ratingCount, ...restaurant }) => (
            <GridCol
              key={restaurant.id}
              span={{ base: 6, sm: 4, md: 3, lg: 2.4 }}
            >
              <RestaurantCard
                image="phuket_nwegsz"
                restaurant={restaurant}
                rating={avgRating}
                ratingCount={ratingCount}
              />
            </GridCol>
          ))}
      </Grid>
    </div>
  );
};
