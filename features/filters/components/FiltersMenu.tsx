"use client";

import { useRouter } from "next/navigation";

import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";

import { cuisineOptions } from "@/features/restaurants";

import { CuisineFormValues } from "../types";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { CuisineFieldset } from "./Cuisinefieldset";

export function FiltersMenu() {
  const router = useRouter();
  const filters = useFilterQuery();

  const form = useForm<CuisineFormValues>({
    // mode: "uncontrolled",
    initialValues: cuisineOptions.reduce((acc, el) => {
      return { ...acc, [el]: filters.cuisine.includes(el) };
    }, {}),
  });

  const submit = (values: CuisineFormValues) => {
    const selected = Object.entries(values)
      .filter(([, value]) => value)
      .map(([key]) => key);

    router.push(`/restaurants?cuisine=${selected.join(",")}`);
    router.refresh();
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(submit)} w={200}>
      <CuisineFieldset initialValues={cuisineOptions.reduce((acc, el) => {
      return { ...acc, [el]: filters.cuisine.includes(el) };
    }, {})}
      onSubmit={submit}
      form={form}
    />
    </Box>
  );
}
