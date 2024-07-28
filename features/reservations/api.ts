import "server-only"

import { createClient } from "@/lib/supabase/server";
import { KEY, SCHEMA } from "./constants";
import { Insert, Read, Update, Id } from "./types";

export function api() {
  const supabase = createClient()

  // Utility functions for the DB table
  const getAll = async () => {
    const { data, error } = await supabase.from(KEY).select('*')
    if (error) throw error
    return data
  }

  const getSpecificColumns = async (columns: keyof Read) => {
    const { data, error } = await supabase.from(KEY).select(columns)
    if (error) throw error
    return data
  }

  const getWithPagination = async (from: number, to: number) => {
    const { data, error } = await supabase.from(KEY).select('*').range(from, to)
    if (error) throw error
    return data
  }

  // Using NonNullable because even if some values can be null in the DB, filtering by `null` doesn't make any sense (or does it?)
  const getFilteredReservations = async <K extends keyof Read>(column: K, value: NonNullable<Read[K]>) => {
    const { data, error } = await supabase.from(KEY).select('*').eq(column, value)
    if (error) throw error
    return data
  }

  const getById = async (id: Id) => {
    const { data, error } = await supabase.from(KEY).select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  const insert = async (reservation: Insert) => {
    const { data, error } = await supabase
      .from(KEY)
      .insert([reservation])
      .select()
      .single()
    if (error) throw error
    return data
  }

  const update = async (
    id: Id,
    updatedFields: Update
  ) => {
    const { data, error } = await supabase.from(KEY).update(updatedFields).eq('id', id).select().single()
    if (error) throw error
    return data
  }

  const remove = async (id: Id) => {
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

  const subscribeToSpecificRow = <K extends keyof Read>(column: K, value: Read[K]) => {
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
    getAll,
    getSpecificColumns,
    getWithPagination,
    getFilteredReservations,
    getById,
    insert,
    update,
    remove,
    subscribeToAllEvents,
    subscribeToInserts,
    subscribeToUpdates,
    subscribeToDeletes,
    subscribeToSpecificRow,
  }
}
