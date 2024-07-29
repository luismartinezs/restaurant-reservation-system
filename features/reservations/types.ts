import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/database.types"
import { KEY, VIEW } from "./constants"

export type Read = Tables<typeof KEY>
export type Insert = TablesInsert<typeof KEY>
export type Update = TablesUpdate<typeof KEY>
export type Id = Read["id"]
// reservations restaurants
export type ReservationRestaurant = Tables<typeof VIEW.reservationsRestaurants>