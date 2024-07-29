import {
  Title,
  Stack,
  Button,
  NumberInput,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";

import { userApi } from "@/features/users/server";

import { book } from "../actions";
import { Id } from "@/features/restaurants";
import { CiCalendar, CiClock1, CiUser } from "react-icons/ci";
import invariant from "tiny-invariant";

// needs to return format compatible with supabase, e.g. `2024-07-17 21:09:50+00`
function parseDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ssZZ");
}

function getFormData(formData: FormData) {
  return {
    date: formData.get("date"),
    time: formData.get("time"),
    people: formData.get("people"),
  };
}

function validate(formData: FormData) {
  const { date, time, people } = getFormData(formData);

  if (!date || !time || !people) {
    return "Missing required fields";
  }

  return true;
}

export const BookForm = async ({ restaurantId }: { restaurantId: Id }) => {
  const {
    data: { user },
  } = await userApi().getUser();

  async function handleSubmit(formData: FormData) {
    "use server";
    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    const { date, time, people } = getFormData(formData);

    console.log("date", date);


    invariant(user, "You are not logged in");

    console.log("logedin");


    book({
      start: parseDate(`${date as string} ${time as string}`),
      people: Number(people),
      restaurant_id: restaurantId,
      user_id: user.id,
    });
  }

  return (
    <div>
      <Title order={2} mb="md">
        Make a reservation
      </Title>
      <form>
        <Stack>
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
          />
          <Button type="submit" formAction={handleSubmit}>
            Create
          </Button>
        </Stack>
      </form>
    </div>
  );
};
