"use client";

import { useRouter } from "next/navigation";
import { Box, Checkbox, Fieldset, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { cuisineOptions } from "@/features/restaurants";
import { CuisineFormValues } from "../types";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useEffect } from "react";

export function FiltersMenu() {
  const router = useRouter();
  const filters = useFilterQuery();

  const form = useForm<CuisineFormValues>({
    initialValues: cuisineOptions.reduce((acc, cuisine) => ({
      ...acc,
      [cuisine]: false
    }), {}),
  });

  useEffect(() => {
    cuisineOptions.forEach((cuisine) => {
      form.setFieldValue(cuisine, filters.cuisine.includes(cuisine));
    });
  }, [filters.cuisine]);

  const handleSubmit = (values: CuisineFormValues) => {
    const selected = Object.entries(values)
      .filter(([, value]) => value)
      .map(([key]) => key);

    router.push(`/restaurants?cuisine=${selected.join(",")}`);
    router.refresh();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    form.setFieldValue(name, checked);
    form.onSubmit(handleSubmit)();
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w={200}>
      <Fieldset legend="Cuisines" variant="unstyled">
        <Stack>
          {cuisineOptions.map((cuisine) => (
            <Checkbox
              key={cuisine}
              label={cuisine}
              name={cuisine}
              checked={form.values[cuisine]}
              onChange={handleChange}
            />
          ))}
        </Stack>
      </Fieldset>
    </Box>
  );
}