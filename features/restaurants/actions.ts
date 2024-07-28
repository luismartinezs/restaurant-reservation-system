"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "./api";
import { Id } from "./types";


export async function handleDelete(id: Id,
  redirectPath?: string) {
  "use server";

  const { deleteRestaurant } = await api();

  await deleteRestaurant(id);

  revalidatePath("/scaffold/restaurants/list");

  if (redirectPath) {
    redirect(redirectPath);
  }

  return "deleted";
}

export async function submit(data: {
  name: string;
  location: string;
  cuisine_type: string;
  seating_capacity: number;
}, id?: number) {
  const { insertRestaurant, updateRestaurant } = await api();

  const handler = typeof id === "undefined" ? insertRestaurant.bind(null, data) : updateRestaurant.bind(null, id, data);

  const restaurant = await handler();

  if (restaurant) {
    redirect(`/scaffold/restaurants/${restaurant.id}`);
  }
}