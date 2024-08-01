"use client";

import { Checkbox, Fieldset } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useChangeSearchParams } from "@/common/hooks/useChangeSearchParams";
import { useState } from "react";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import { FilterSlicer } from "./FilterSlicer";

export function LocationFilters({
  locationOptions,
}: {
  locationOptions: string[];
}) {
  const router = useRouter();
  const filters = useFilterQuery();
  const { update, remove } = useChangeSearchParams();
  const [value, setValue] = useState(filters.location);

  const handleSubmit = useDebouncedCallback(() => {
    if (value.length === 0) {
      const params = remove(["location"]);
      router.push(`/restaurants?${params}`);
      return;
    }
    const params = update({ location: value.join(",") });
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
      legend="Location"
      variant="unstyled"
      styles={{
        legend: { fontWeight: "bold" },
      }}
    >
      <FilterSlicer
        items={locationOptions}
        renderItem={(location) => (
          <Checkbox
            key={location}
            label={location}
            name={location}
            checked={value.includes(location)}
            onChange={handleChange}
            styles={{
              label: { paddingLeft: "7px" },
            }}
          />
        )}
      />
    </Fieldset>
  );
}
