import {
  Box,
  Title,
  Stack,
  Button,
  Select,
  SelectProps,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import dayjs from "dayjs";

import { api as restaurantsApi } from "@/features/restaurants/server";
import { api as authApi } from "@/features/auth/server";

import { Read } from "../types";
import { submit } from "../actions";

// needs to return format compatible with supabase, e.g. `2024-07-17 21:09:50+00`
function parseDate(date:string) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ssZZ')
}

function getFormData(formData: FormData) {
  return {
    start: parseDate(formData.get("start") as string),
    restaurant_id: Number(formData.get("restaurant_id") as string),
    user_id: formData.get("user_id") as string,
    people: 2 // "people" added ad hoc to match DB schema
  };
}

function validate(formData: FormData) {
  const { start, restaurant_id, user_id } = getFormData(formData);

  if (!restaurant_id || !user_id || !start) {
    return "Missing required fields";
  }

  return true;
}

async function SelectRestaurant(props: SelectProps) {
  const {defaultValue} = props;
  const restaurants = await restaurantsApi().getAllRestaurants();

  const options = restaurants.map((restaurant) => ({
    value: String(restaurant.id),
    label: restaurant.name,
  }));

  return (
    <Select
      label="Restaurant"
      placeholder="Select restaurant"
      name="restaurant_id"
      data={options}
      defaultValue={defaultValue}
      {...props}
    />
  );
}

async function SelectUser(props: SelectProps) {
  const {defaultValue} = props;
  const users = await authApi().getAll();

  const options = users.map((user) => String(user.id));

  return (
    <Select
      label="User"
      placeholder="Select user"
      name="user_id"
      data={options}
      defaultValue={defaultValue}
      {...props}
    />
  );
}

const Form = ({ initialData }: { initialData?: Read }) => {
  const { start, restaurant_id, user_id, id } = initialData || {};
  const isEdit = typeof id !== "undefined";

  function handleSubmit(formData: FormData) {
    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    submit(getFormData(formData))
  }


  return (
    <Box mx="auto">
      <Title order={2} mb="md">
        Create New Reservation
      </Title>
      <form>
        <Stack>
          <SelectRestaurant defaultValue={typeof restaurant_id !== 'undefined' ? String(restaurant_id) : undefined} required />
          <SelectUser defaultValue={typeof user_id !== 'undefined' ? String(user_id) : undefined} required />
          <DateTimePicker
            label="Start Time"
            placeholder="Select date and time"
            name="start"
            required
            defaultValue={start ? new Date(start) : undefined}
          />
          <Button type="submit" formAction={handleSubmit}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export { Form };
