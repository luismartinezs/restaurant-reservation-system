import React from "react";
import { Grid, GridCol, Text } from "@mantine/core";
import { RestaurantCard } from "./RestaurantCard";
import { api } from "../../api";
import { api as ratingsApi } from "@/features/ratings/api";
import { getRestaurantsWithAvgRating } from "../../utils";

export const TopRecommendations = async () => {
  const restaurants = await api().getAllRestaurants();
  const ratings = await ratingsApi().getAll();

  const restaurantsWithRatings = getRestaurantsWithAvgRating(
    restaurants,
    ratings
  ).sort((a, b) => b.avgRating - a.avgRating);

  return (
    <div>
      <Text size="xl" fw={600}>
        Top Recommendations
      </Text>
      <Text mb="lg">Recommended as the best restaurants</Text>
      <Grid>
        {restaurantsWithRatings
          .slice(0, 5)
          .map(({ avgRating, ratingCount, ...restaurant }) => (
            <GridCol
              key={restaurant.id}
              span={{ base: 6, sm: 4, md: 3, lg: 2.4 }}
            >
              <RestaurantCard
                image={`https://res.cloudinary.com/dicyllvry/image/upload/v1722433325/restaurant-reservation-system/phuket_nwegsz.jpg`}
                title={restaurant.name}
                rating={avgRating}
                ratingCount={ratingCount}
              />
            </GridCol>
          ))}
      </Grid>
    </div>
  );
};
