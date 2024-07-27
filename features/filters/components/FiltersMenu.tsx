"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Checkbox, Fieldset, Stack } from "@mantine/core";
import { cuisineOptions } from "@/features/restaurants";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { useChangeSearchParams } from "@/common/hooks/useChangeSearchParams";

export function FiltersMenu() {
  const router = useRouter();
  const filters = useFilterQuery();
  const { getAsString, update } = useChangeSearchParams();
  const [value, setValue] = useState(filters.cuisine);

  const handleSubmit = useDebouncedCallback(() => {
    if (value.length === 0) {
      router.push(`/restaurants?${getAsString()}`);
      router.refresh();
      return;
    }
    const params = update({ cuisine: value.join(",") });
    router.push(`/restaurants?${params}`);
    router.refresh();
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    setValue((prev) =>
      checked ? [...prev, name] : prev.filter((c) => c !== name)
    );
    handleSubmit();
  };

  return (
    <Box component="form" w={200}>
      <Fieldset legend="Cuisine" variant="unstyled">
        <Stack>
          {cuisineOptions.map((cuisine) => (
            <Checkbox
              key={cuisine}
              label={cuisine}
              name={cuisine}
              checked={value.includes(cuisine)}
              onChange={handleChange}
            />
          ))}
        </Stack>
      </Fieldset>
    </Box>
  );
}
