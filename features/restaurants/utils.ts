import { RestaurantRead } from "./types";
import { Read as RatingRead } from "@/features/ratings"

export function getRestaurantsWithAvgRating(restaurants: RestaurantRead[], ratings: RatingRead[]) {
  const ratingMap = new Map<number, { sum: number; count: number }>();

  for (const rating of ratings) {
    const { restaurant_id, rating: ratingValue } = rating;
    if (!ratingMap.has(restaurant_id)) {
      ratingMap.set(restaurant_id, { sum: 0, count: 0 });
    }
    const restaurantRating = ratingMap.get(restaurant_id)!;
    restaurantRating.sum += ratingValue;
    restaurantRating.count++;
  }

  return restaurants.map(restaurant => {
    const restaurantRating = ratingMap.get(restaurant.id);
    const avgRating = restaurantRating
      ? restaurantRating.sum / restaurantRating.count
      : 0;
    const ratingCount = restaurantRating?.count || 0;
    return { ...restaurant, avgRating, ratingCount };
  });
}