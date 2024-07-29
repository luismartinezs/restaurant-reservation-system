import { Display as RatingDisplay } from "@/features/ratings";
import { RestaurantRead } from "@/features/restaurants";
import { Container, Group } from "@mantine/core";
import { api as ratingsApi } from "@/features/ratings/server";
import { CiForkAndKnife, CiLocationOn } from "react-icons/ci";

export async function Detail({ restaurant }: { restaurant: RestaurantRead }) {
  const ratings = await ratingsApi().getFilteredRatings(
    "restaurant_id",
    restaurant.id
  );
  const rating =
    ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
  const ratingCount = ratings.length;

  return (
    <div>
      <h1 className="text-3xl font-bold my-6">{restaurant.name}</h1>
      <div className="flex gap-6">
        <RatingDisplay rating={rating} ratingCount={ratingCount} />
        <Group gap={4}>
          <CiLocationOn size={20} />
          {restaurant.location}
        </Group>
        <Group gap={4}>
          <CiForkAndKnife size={20} />
          {restaurant.cuisine_type}
        </Group>
      </div>
    </div>
  );
}
