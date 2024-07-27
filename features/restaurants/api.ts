import { createClient } from "@/lib/supabase/server";
import { KEY, SCHEMA } from "./constants";
import { RestaurantInsert, RestaurantRead, RestaurantUpdate, Id } from "./types";

export async function api() {
  const supabase = await createClient()

  // Utility functions for the restaurants table
  const getAllRestaurants = async () => {
    const { data, error } = await supabase.from(KEY).select('*')
    if (error) throw error
    return data
  }

  const getSpecificColumns = async (columns: keyof RestaurantRead) => {
    const { data, error } = await supabase.from(KEY).select(columns)
    if (error) throw error
    return data
  }

  const getWithPagination = async (from: number, to: number) => {
    const { data, error } = await supabase.from(KEY).select('*').range(from, to)
    if (error) throw error
    return data
  }

  const getFilteredRestaurants = async <K extends keyof RestaurantRead>(column: K, value: RestaurantRead[K]) => {
    const { data, error } = await supabase.from(KEY).select('*').eq(column, value)
    if (error) throw error
    return data
  }

  const getRestaurantById = async (id: Id) => {
    const { data, error } = await supabase.from(KEY).select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  const insertRestaurant = async (restaurant: RestaurantInsert) => {
    const { data, error } = await supabase
      .from(KEY)
      .insert([restaurant])
      .select()
      .single()
    if (error) throw error
    return data
  }

  const updateRestaurant = async (
    id: Id,
    updatedFields: RestaurantUpdate
  ) => {
    const { data, error } = await supabase.from(KEY).update(updatedFields).eq('id', id).select().single()
    if (error) throw error
    return data
  }

  const deleteRestaurant = async (id: Id) => {
    const { error } = await supabase.from(KEY).delete().eq('id', id)
    if (error) throw error
  }

  const subscribeToAllEvents = () => {
    const channel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: SCHEMA, table: KEY }, (payload) => {
        console.log('Change received!', payload)
      })
      .subscribe()
    return channel
  }

  const subscribeToInserts = () => {
    const channel = supabase
      .channel('custom-insert-channel')
      .on('postgres_changes', { event: 'INSERT', schema: SCHEMA, table: KEY }, (payload) => {
        console.log('Change received!', payload)
      })
      .subscribe()
    return channel
  }

  const subscribeToUpdates = () => {
    const channel = supabase
      .channel('custom-update-channel')
      .on('postgres_changes', { event: 'UPDATE', schema: SCHEMA, table: KEY }, (payload) => {
        console.log('Change received!', payload)
      })
      .subscribe()
    return channel
  }

  const subscribeToDeletes = () => {
    const channel = supabase
      .channel('custom-delete-channel')
      .on('postgres_changes', { event: 'DELETE', schema: SCHEMA, table: KEY }, (payload) => {
        console.log('Change received!', payload)
      })
      .subscribe()
    return channel
  }

  const subscribeToSpecificRow = <K extends keyof RestaurantRead>(column: K, value: RestaurantRead[K]) => {
    const channel = supabase
      .channel('custom-filter-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: SCHEMA, table: KEY, filter: `${column}=eq.${value}` },
        (payload) => {
          console.log('Change received!', payload)
        }
      )
      .subscribe()
    return channel
  }

  return {
    getAllRestaurants,
    getSpecificColumns,
    getWithPagination,
    getFilteredRestaurants,
    getRestaurantById,
    insertRestaurant,
    updateRestaurant,
    deleteRestaurant,
    subscribeToAllEvents,
    subscribeToInserts,
    subscribeToUpdates,
    subscribeToDeletes,
    subscribeToSpecificRow
  }
}
