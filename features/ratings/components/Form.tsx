import { Box, Title, Stack, Button, Select, SelectProps, NumberInput } from "@mantine/core";

import { api as restaurantsApi } from "@/features/restaurants/server";
import { api as authApi } from "@/features/auth/server";

import { Read } from "../types";
import { handleSubmit } from "../actions";

function getFormData(formData: FormData) {
  return {
    rating: Number(formData.get("rating") as string),
    restaurant_id: Number(formData.get("restaurant_id") as string),
    user_id: formData.get("user_id") as string,
  };
}

function validate(formData: FormData) {
  const { rating, restaurant_id, user_id } = getFormData(formData);

  if (isNaN(rating)) {
    return "Rating must be a number";
  }

  if (!restaurant_id || !user_id || typeof rating !== "number") {
    return "Missing required fields";
  }

  return true;
}

async function SelectRestaurant(props: SelectProps) {
  const { defaultValue } = props;
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
  const { defaultValue } = props;
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
  const isEdit = typeof initialData !== "undefined";
  const { rating, restaurant_id, user_id, id } = initialData || {};

  async function submit(formData: FormData) {
    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    handleSubmit(formData, id);
  }
  return (
    <Box mx="auto">
      <Title order={2} mb="md">
        Create New Rating
      </Title>
      <form>
        <Stack>
          <SelectRestaurant
            defaultValue={
              typeof restaurant_id !== "undefined"
                ? String(restaurant_id)
                : undefined
            }
            required
          />
          <SelectUser
            defaultValue={
              typeof user_id !== "undefined" ? String(user_id) : undefined
            }
            required
          />
          <NumberInput
            label="Rating"
            name="rating"
            required
            defaultValue={rating ? rating : undefined}
            min={1}
            max={5}
            allowDecimal={false}
            allowNegative={false}
            clampBehavior="strict"
            description="Rating must be between 1 and 5"
          />
          <Button type="submit" formAction={submit}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export { Form };
