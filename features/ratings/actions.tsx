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