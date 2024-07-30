"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "./api";
import { KEY } from "./constants";
import { Id, Read } from "./types";


export async function handleDelete(id: Id, redirectPath?: string) {
  const { remove } = api();

  console.log("deleting", id);

  await remove(id);

  revalidatePath(`/account/reservations`);

  if (redirectPath) {
    redirect(redirectPath);
  }

  return "deleted";
}

export async function submit(data: {
  start: string;
  restaurant_id: number;
  user_id: string;
  people: number;
}, id?: Id) {
  const { insert, update } = api();

  const submitHandler =
    typeof id === "undefined"
      ? insert.bind(null, data)
      : update.bind(null, id, data);

  const item = await submitHandler();

  if (item) {
    redirect(`/scaffold/${KEY}/${item.id}`);
  }
}

export async function book(data: {
  id?: Id;
  people: number;
  restaurant_id: number;
  start: string;
  user_id: string;
}) {
  const { book: doBook, editBooking } = api();

  try {
    // @ts-ignore - prevent useless ts error
    const item = data.id ? await editBooking(data) : await doBook(data)
    return item
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message
      }
    }
    return {
      error: "An error occurred"
    }
  }
}