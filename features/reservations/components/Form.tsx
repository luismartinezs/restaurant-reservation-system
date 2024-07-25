import {
  TextInput,
  NumberInput,
  Box,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import { api } from "../api";
import { redirect } from "next/navigation";
import { Read } from "../types";
import { KEY } from "../constants";
import { DateTimePicker } from "@mantine/dates";

function getFormData(formData: FormData) {
  return {
    start: formData.get("start") as string,
    restaurant_id: formData.get("restaurant_id") as string,
    user_id: formData.get("user_id") as string,
    id: formData.get("id") as string,
  };
}

function validate(formData: FormData) {
  const { start, restaurant_id, user_id, id } = getFormData(formData);

  if (!restaurant_id || !user_id) {
    return "Missing required fields";
  }

  return true;
}

const Form = ({ initialData }: { initialData?: Read }) => {
  const { start, restaurant_id, user_id, id } = initialData || {};

  async function submit(formData: FormData) {
    "use server";

    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    const { insert, update } = api();

    const handler =
      typeof id === "undefined"
        ? insert.bind(null, getFormData(formData))
        : update.bind(null, id, getFormData(formData));

    const item = await handler();

    if (item) {
      redirect(`/scaffold/${KEY}/${item.id}`);
    }
  }
  return (
    <Box mx="auto">
      <Title order={2} mb="md">
        Create New Reservation
      </Title>
      <form>
        <Stack>
          <NumberInput
            label="Restaurant ID"
            placeholder="Enter restaurant ID"
            name="restaurant_id"
            required
            min={1}
            defaultValue={restaurant_id}
          />
          <TextInput
            label="User ID"
            placeholder="Enter user ID"
            name="user_id"
            required
            defaultValue={user_id}
          />
          <DateTimePicker
            label="Reservation Start Time"
            placeholder="Select date and time"
            name="start"
            required
          />
          <Button type="submit" formAction={submit}>
            Create Reservation
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export { Form };
