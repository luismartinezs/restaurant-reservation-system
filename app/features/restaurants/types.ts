import { Tables, TablesInsert, TablesUpdate } from "@/lib/supabase/database.types"
import { KEY } from "./constants"

export type RestaurantRead = Tables<typeof KEY>
export type RestaurantInsert = TablesInsert<typeof KEY>
export type RestaurantUpdate = TablesUpdate<typeof KEY>
export type Id = RestaurantRead["id"]