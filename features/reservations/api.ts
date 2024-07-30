import "server-only"

import { createClient } from "@/lib/supabase/server";
import { KEY, SCHEMA, VIEW } from "./constants";
import { Insert, Read, Update, Id } from "./types";
import { api as restaurantApi } from "@/features/restaurants/server"
import { canReserve } from "./utils";
import invariant from "tiny-invariant";

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

  const getFilteredReservationsRestaurants = async <K extends keyof Read>(column: K, value: NonNullable<Read[K]>) => {
    const { data, error } = await supabase.from(VIEW.reservationsRestaurants).select('*').eq(column, value)
    if (error) throw error
    return data
  }

  const getReservationRestaurantByReservationId = async (reservation_id: Id) => {
    const { data, error } = await supabase.from(VIEW.reservationsRestaurants).select('*').eq('reservation_id', reservation_id).single()
    if (error) throw error
    return data
  }

  const getById = async (id: Id) => {
    const { data, error } = await supabase.from(KEY).select('*').eq('id', id).single()
    if (error) throw error
    return data
  }

  // does not take into consideration the restaurant availability
  const insert = async (reservation: Insert) => {
    const { data, error } = await supabase
      .from(KEY)
      .insert([reservation])
      .select()
      .single()
    if (error) throw error
    return data
  }

  const book = async (reservation: Insert) => {
    // get restaurant availability
    const { seating_capacity } = await restaurantApi().getRestaurantById(reservation.restaurant_id)

    const restaurantReservations = await getFilteredReservations('restaurant_id', reservation.restaurant_id)

    if (canReserve(reservation, restaurantReservations, seating_capacity)) {
      return insert(reservation)
    }

    throw new Error('Restaurant is fully booked')
  }

  const editBooking = async (reservation: Insert) => {
    invariant(reservation.id, 'Reservation ID is required')
    // get restaurant availability
    const { seating_capacity } = await restaurantApi().getRestaurantById(reservation.restaurant_id)

    const restaurantReservations = await getFilteredReservations('restaurant_id', reservation.restaurant_id)

    const _canReserve = canReserve(reservation,
      // exclude current reservation as it will be overriden
      restaurantReservations.filter(({ id }) => id !== reservation.id),
      seating_capacity)

    console.log('canReserve', _canReserve);


    if (canReserve(reservation,
      // exclude current reservation as it will be overriden
      restaurantReservations.filter(({ id }) => id !== reservation.id),
      seating_capacity)) {
      return update(reservation.id, reservation)
    }

    throw new Error('Restaurant is fully booked')
  }

  const update = async (
    id: Id,
    updatedFields: Update
  ) => {
    console.log("update reservation");
    // make sure to exclude id
    const { id: _id, ...fields } = updatedFields

    const { data, error } = await supabase.from(KEY).update(fields).eq('id', id).select().single()
    if (error) {
      console.log(error.message)
      throw error
    }
    console.log("updated reservation");

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
    book,
    editBooking,
    getFilteredReservationsRestaurants,
    getReservationRestaurantByReservationId
  }
}
