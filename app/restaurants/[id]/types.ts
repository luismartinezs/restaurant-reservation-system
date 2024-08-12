import { RestaurantRead } from "@/features/restaurants";

export interface PageContext {
  userId: string | null;
  restaurant: RestaurantRead;
}