import { UseFormReturnType } from "@mantine/form";
import { CuisineFormValues } from "../types";
import { Checkbox, Fieldset, Stack } from "@mantine/core";
import { cuisineOptions } from "@/features/restaurants";

export function CuisineFieldset({
  initialValues,
  onSubmit,
  form,
}: {
  initialValues: CuisineFormValues;
  onSubmit: (values: CuisineFormValues) => void;
  form: UseFormReturnType<CuisineFormValues>;
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    form.setFieldValue(name, checked);
    form.onSubmit(onSubmit)();
  };

  return (
    <Fieldset legend="Cuisines" variant="unstyled">
      <Stack>
        {cuisineOptions.map((cuisine) => (
          <Checkbox
            key={cuisine}
            label={cuisine}
            name={cuisine}
            {...{
              ...form.getInputProps(cuisine),
              defaultChecked: initialValues[cuisine],
              onChange: handleChange,
            }}
          />
        ))}
      </Stack>
    </Fieldset>
  );
}
