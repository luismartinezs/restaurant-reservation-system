import { RestaurantRead } from "./types";
import { Read as RatingRead } from "@/app/features/ratings"
import { Read as ReservationRead } from "@/app/features/reservations"
import { SearchQuery } from "@/app/features/search"
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

const RESERVATION_DURATION = 2 // hours;

function getDates(
  date: string, // YYYY-MM-DD
  time?: string, // HH:mm
  separator = ' '
): {
  start: Date;
  end: Date;
} {
  const datetime = time ? `${date}${separator}${time}` : date;
  const start = dayjs(datetime)

  return {
    start: start.toDate(),
    end: start.add(RESERVATION_DURATION, "hour").toDate()
  }
}

export function getAvailableRestaurants<T extends RestaurantRead>(restaurants: T[], reservations: ReservationRead[], searchQuery: SearchQuery) {
  const { date, time, people } = searchQuery;
  const { start } = getDates(date, time);

  const overlappingResevationsMap = new Map<number, number>()

  dayjs.extend(isBetween)

  reservations.forEach(res => {
    const _resDates = getDates(res.start)
    if (
      dayjs(start).isBetween(_resDates.start, _resDates.end)
    ) {
      overlappingResevationsMap.set(res.restaurant_id, res.people)
    }
  })

  return restaurants.filter(r => r.seating_capacity > people + (overlappingResevationsMap.get(r.id) || 0)).map(r => ({
    ...r,
    availableSeats: r.seating_capacity - (overlappingResevationsMap.get(r.id) || 0)
  }))
}

export function getRestaurantsWithAvgRating<T extends RestaurantRead>(restaurants: T[], ratings: RatingRead[]) {
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