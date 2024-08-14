import 'server-only'

import { calcAvg } from "@/common/utils";
import { Id } from "../restaurants";
import { api } from "./api";

export async function getRatingData(restaurantId: Id) {
  const ratings = await api().getFilteredRatings('restaurant_id', restaurantId)
  return { rating: calcAvg(ratings.map(r => r.rating)), ratingCount: ratings.length }
}