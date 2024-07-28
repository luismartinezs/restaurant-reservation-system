import {
  TextInput,
  NumberInput,
  Select,
  Box,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import { cuisineOptions } from "../constants";
import { RestaurantRead } from "../types";
import { submit } from "../actions";

function getFormData(formData: FormData) {
  return {
    name: formData.get("name") as string,
    location: formData.get("location") as string,
    cuisine_type: formData.get("cuisine_type") as string,
    seating_capacity: parseInt(formData.get("seating_capacity") as string),
  };
}

function validate(formData: FormData) {
  const { name, location, cuisine_type, seating_capacity } =
    getFormData(formData);

  if (!name || !location || !cuisine_type || !seating_capacity) {
    return "All fields are required";
  }

  return true;
}

const RestaurantForm = ({ initialData }: { initialData?: RestaurantRead }) => {
  const { name, location, cuisine_type, seating_capacity, id } =
    initialData || {};

  async function handleSubmit(formData: FormData) {
    const validated = validate(formData);

    if (validated !== true) {
      return validated;
    }

    submit(getFormData(formData), id);
  }
  return (
    <Box mx="auto">
      <Title order={2} mb="md">
        Create New Restaurant
      </Title>
      <form>
        <Stack>
          <TextInput
            label="Restaurant Name"
            placeholder="Enter restaurant name"
            name="name"
            required
            defaultValue={name}
          />
          <TextInput
            label="Location"
            placeholder="Enter location"
            required
            name="location"
            defaultValue={location}
          />
          <Select
            label="Cuisine Type"
            placeholder="Select cuisine type"
            name="cuisine_type"
            data={cuisineOptions}
            defaultValue={cuisine_type}
            required
          />
          <NumberInput
            label="Seating Capacity"
            placeholder="Enter seating capacity"
            name="seating_capacity"
            required
            defaultValue={seating_capacity}
            min={1}
          />
          <Button type="submit" formAction={handleSubmit}>
            Create Restaurant
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export { RestaurantForm };
