"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "./api";
import { KEY } from "./constants";
import { Id } from "./types";


export async function handleDelete(id: Id, redirectPath?: string) {
  const { remove } = api();

  await remove(id);

  revalidatePath(`/scaffold/${KEY}/list`);

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
}, id?: number) {
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
  people: number;
  restaurant_id: number;
  start: string;
  user_id: string;
}) {
  const { book: doBook } = api();

  console.log(data.start);


  try {
    const item = await doBook(data);
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