"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { api } from "./api";
import { KEY } from "./constants";
import { Id } from "./types";
import { z } from "zod";
import { User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { getRandInt } from "@/common/utils";

// needs to return format compatible with supabase, e.g. `2024-07-17 21:09:50+00`
function parseDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ssZZ");
}

function getFormData(formData: FormData) {
  return {
    date: formData.get("date") as string,
    time: formData.get("time") as string,
    people: formData.get("people") as string,
  };
}

function parseFormData(
  formData: FormData,
  ids: {
    restaurantId: Id;
    userId: User["id"];
    reservationId?: Id;
  }
) {
  const { date, time, people } = getFormData(formData);
  const { restaurantId, userId, reservationId } = ids;
  const isEdit = !!reservationId;

  const payload = {
    start: parseDate(
      `${dayjs(date).format("YYYY-MM-DD") as string} ${time as string}`
    ),
    people: Number(people),
    restaurant_id: restaurantId,
    user_id: userId,
    id: isEdit ? reservationId : undefined,
  }

  return payload;
}

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

const schema = z.object({
  id: z.number().optional(),
  people: z.number(),
  restaurant_id: z.number(),
  start: z.string(),
  user_id: z.string(),
});

export async function editReservation(payload: {
  restaurantId: Id;
  userId: User["id"];
  reservationId?: Id;
}, prevState: any, formData: FormData) {
  const data = parseFormData(formData, payload);

  const { editBooking } = api();

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      key: getRandInt(6),
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // @ts-ignore - prevent useless ts error
    const reservation = await editBooking(data)
    revalidatePath(`/account/reservations`);
    revalidatePath(`/restaurants`);
    revalidatePath(`/account/reservations/${reservation.id}`);
    return {
      key: getRandInt(6),
      message: "Booking update successful",
      type: "success"
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        key: getRandInt(6),
        errors: {
          server: [err.message]
        }
      }
    }
    return {
      key: getRandInt(6),
      errors: {
        server:
          ["An error occurred"]
      }
    }
  }
}

export async function createReservation(
  payload: {
    restaurantId: Id;
    userId: User["id"];
  },
  prevState: any, formData: FormData
) {
  const data = parseFormData(formData, payload);

  const { book: doBook } = api();

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      key: getRandInt(6),
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // @ts-ignore - prevent useless ts error
    const reservation = await doBook(data)
    revalidatePath(`/account/reservations`);
    revalidatePath(`/restaurants`);
    redirect(`/account/reservations/${reservation.id}`);
    return {
      key: getRandInt(6),
      message: "Booking successful",
      type: "success"
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        key: getRandInt(6),
        errors: {
          server: [err.message]
        }
      }
    }
    return {
      key: getRandInt(6),
      errors: {
        server:
          ["An error occurred"]
      }
    }
  }
}

export async function book(
  ids: {
    restaurantId: Id;
    userId: User["id"];
    reservationId?: Id;
  },
  prevState: any, formData: FormData
) {
  const data = parseFormData(formData, ids);

  const { book: doBook, editBooking } = api();
  const isEdit = !!data.id;

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      key: getRandInt(6),
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    // @ts-ignore - prevent useless ts error
    const reservation = isEdit ? await editBooking(data) : await doBook(data)
    revalidatePath(`/account/reservations`);
    revalidatePath(`/restaurants`);
    if (isEdit) {
      revalidatePath(`/account/reservations/${reservation.id}`);
    } else {
      redirect(`/account/reservations/${reservation.id}`);
    }
    return {
      key: getRandInt(6),
      message: "Booking successful",
      type: "success"
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        key: getRandInt(6),
        errors: {
          server: [err.message]
        }
      }
    }
    return {
      key: getRandInt(6),
      errors: {
        server:
          ["An error occurred"]
      }
    }
  }
}