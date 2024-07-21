import { createClient } from "@/lib/supabase/server";

const supabase = createClient()

const SCHEMA = 'public'
const RESTAURANTS = 'restaurants'

// Utility functions for the restaurants table
export const getAllRestaurants = async () => {
  const { data, error } = await supabase.from(RESTAURANTS).select('*')
  if (error) throw error
  return data
}

export const getSpecificColumns = async (columns: string) => {
  const { data, error } = await supabase.from(RESTAURANTS).select(columns)
  if (error) throw error
  return data
}

export const getWithPagination = async (from: number, to: number) => {
  const { data, error } = await supabase.from(RESTAURANTS).select('*').range(from, to)
  if (error) throw error
  return data
}

export const getFilteredRestaurants = async (column: string, value: string) => {
  const { data, error } = await supabase.from(RESTAURANTS).select('*').eq(column, value)
  if (error) throw error
  return data
}

export const insertRestaurant = async (restaurant: {
  name: string
  location: string
  cuisine_type: string
  seating_capacity: number
}) => {
  const { data, error } = await supabase
    .from(RESTAURANTS)
    .insert([restaurant])
    .select()
  if (error) throw error
  return data
}

export const updateRestaurant = async (
  id: bigint,
  updatedFields: Partial<{
    name: string
    location: string
    cuisine_type: string
    seating_capacity: number
  }>
) => {
  const { data, error } = await supabase.from(RESTAURANTS).update(updatedFields).eq('id', id).select()
  if (error) throw error
  return data
}

export const deleteRestaurant = async (id: bigint) => {
  const { error } = await supabase.from(RESTAURANTS).delete().eq('id', id)
  if (error) throw error
}

export const subscribeToAllEvents = () => {
  const channel = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: SCHEMA, table: RESTAURANTS }, (payload) => {
      console.log('Change received!', payload)
    })
    .subscribe()
  return channel
}

export const subscribeToInserts = () => {
  const channel = supabase
    .channel('custom-insert-channel')
    .on('postgres_changes', { event: 'INSERT', schema: SCHEMA, table: RESTAURANTS }, (payload) => {
      console.log('Change received!', payload)
    })
    .subscribe()
  return channel
}

export const subscribeToUpdates = () => {
  const channel = supabase
    .channel('custom-update-channel')
    .on('postgres_changes', { event: 'UPDATE', schema: SCHEMA, table: RESTAURANTS }, (payload) => {
      console.log('Change received!', payload)
    })
    .subscribe()
  return channel
}

export const subscribeToDeletes = () => {
  const channel = supabase
    .channel('custom-delete-channel')
    .on('postgres_changes', { event: 'DELETE', schema: SCHEMA, table: RESTAURANTS }, (payload) => {
      console.log('Change received!', payload)
    })
    .subscribe()
  return channel
}

export const subscribeToSpecificRow = (column: string, value: string) => {
  const channel = supabase
    .channel('custom-filter-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: SCHEMA, table: RESTAURANTS, filter: `${column}=eq.${value}` },
      (payload) => {
        console.log('Change received!', payload)
      }
    )
    .subscribe()
  return channel
}
