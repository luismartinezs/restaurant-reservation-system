import { Title, Stack, Button, NumberInput, Flex } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";

import { userApi } from "@/features/users/server";

import { book } from "../actions";
import { Id } from "@/features/restaurants";
import { CiCalendar, CiClock1, CiUser } from "react-icons/ci";
import invariant from "tiny-invariant";
import { getSearchQuery } from "@/features/search";
import { Insert, Update } from "../types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

function validate(formData: FormData) {
  const { date, time, people } = getFormData(formData);

  if (!date || !time || !people) {
    return "Missing required fields";
  }

  return true;
}

export const BookForm = async ({
  restaurantId,
  reservationId,
  initialData,
}: {
  restaurantId: Id;
  reservationId?: Id;
  initialData?: Update;
}) => {
  const isEdit = !!reservationId;
  const {
    data: { user },
  } = await userApi().getUser();
  const query = getSearchQuery();

  async function handleSubmit(formData: FormData) {
    "use server";
    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    const { date, time, people } = getFormData(formData);

    invariant(user, "You are not logged in");

    const payload = {
      start: parseDate(
        `${dayjs(date).format("YYYY-MM-DD") as string} ${time as string}`
      ),
      people: Number(people),
      restaurant_id: restaurantId,
      user_id: user.id,
    };

    console.log(isEdit, reservationId);

    if (isEdit) {
      // @ts-ignore ts is dumb sometimes
      payload.id = reservationId;
    }

    const booking = await book(payload);

    // TODO this should likely go to the reusable server action
    revalidatePath(`/account/reservations`);
    revalidatePath(`/restaurants`);

    if (isEdit) {
      revalidatePath(`/account/reservations/${reservationId}`);
    } else {
      if ("id" in booking) {
        redirect(`/account/reservations/${booking.id}`);
      }
    }
  }

  return (
    <div>
      <Title order={2} mb="md">
        {isEdit ? "Change your reservation" : "Make a reservation"}
      </Title>
      <form>
        <div className="flex flex-col md:flex-row gap-4">
          <DatePickerInput
            flex={1}
            w={{
              base: "100%",
              md: "auto",
            }}
            aria-label="Date"
            placeholder="Pick a date"
            leftSection={<CiCalendar size="1.1rem" />}
            leftSectionPointerEvents="none"
            required
            name="date"
            defaultValue={
              isEdit
                ? dayjs(initialData?.start).toDate()
                : dayjs(query.date).toDate()
            }
          />
          <TimeInput
            w={{
              base: "100%",
              md: "auto",
            }}
            flex={1}
            aria-label="Time"
            placeholder="Select time"
            leftSection={<CiClock1 size="1.1rem" />}
            leftSectionPointerEvents="none"
            required
            name="time"
            defaultValue={
              isEdit ? dayjs(initialData?.start).format("HH:mm") : query.time
            }
          />
          <NumberInput
            w={{
              base: "100%",
              md: "auto",
            }}
            flex={1}
            aria-label="People"
            placeholder="Select number of people"
            leftSection={<CiUser size="1.1rem" />}
            leftSectionPointerEvents="none"
            min={1}
            max={8}
            required
            name="people"
            defaultValue={isEdit ? initialData?.people : query.people}
          />
          <Button type="submit" formAction={handleSubmit}>
            Book now
          </Button>
        </div>
      </form>
    </div>
  );
};
