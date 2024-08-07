export const SCHEMA = "public"
export const KEY = "reservations";
export const VIEW = {
  reservationsRestaurants: "reservations_restaurants",
} as const
export const MIN_TIME = "13:00"
export const MAX_TIME = "22:00"
export const MIN_PEOPLE = 1
export const MAX_PEOPLE = 8
export const MAX_DATE_RANGE = 2 // months