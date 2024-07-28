"use client";

import { Checkbox, Fieldset } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useChangeSearchParams } from "@/common/hooks/useChangeSearchParams";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import { cuisineOptions } from "@/features/restaurants";

export function CuisineFilters() {
  const router = useRouter();
  const filters = useFilterQuery();
  const { update, remove } = useChangeSearchParams();
  const [value, setValue] = useState(filters.cuisine);

  const handleSubmit = useDebouncedCallback(() => {
    if (value.length === 0) {
      const params = remove(["cuisine"]);
      router.push(`/restaurants?${params}`);
      return;
    }
    const params = update({ cuisine: value.join(",") });
    router.push(`/restaurants?${params}`);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    setValue((prev) =>
      checked ? [...prev, name] : prev.filter((c) => c !== name)
    );
    handleSubmit();
  };

  return (
    <Fieldset
      legend="Cuisine type"
      variant="unstyled"
      styles={{
        legend: { fontWeight: "bold" },
      }}
    >
      <div className="flex flex-wrap gap-5 md:flex-col">
        {cuisineOptions.map((cuisine) => (
          <Checkbox
            key={cuisine}
            label={cuisine}
            name={cuisine}
            checked={value.includes(cuisine)}
            onChange={handleChange}
            styles={{
              label: { paddingLeft: "7px" },
            }}
          />
        ))}
      </div>
    </Fieldset>
  );
}
