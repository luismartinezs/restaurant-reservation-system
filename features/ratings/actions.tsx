"use server"

import { api } from "./api";
import { revalidatePath } from "next/cache";
import { KEY } from "./constants";
import { redirect } from "next/navigation";
import { Id } from "./types";


export async function handleDelete(id: Id, redirectPath?:string) {
  const { remove } = api();

  await remove(id);

  revalidatePath(`/scaffold/${KEY}/list`);

  if (redirectPath) {
    redirect(redirectPath);
  }

  return "deleted";
}

function getFormData(formData: FormData) {
  return {
    rating: Number(formData.get("rating") as string),
    restaurant_id: Number(formData.get("restaurant_id") as string),
    user_id: formData.get("user_id") as string,
  };
}

export async function handleSubmit(formData: FormData, id?: Id) {
  const { insert, update } = api();

  const submitHandler =
    typeof id === "undefined"
      ? insert.bind(null, getFormData(formData))
      : update.bind(null, id, getFormData(formData));

  const item = await submitHandler();

  if (item) {
    redirect(`/scaffold/${KEY}/${item.id}`);
  }
}