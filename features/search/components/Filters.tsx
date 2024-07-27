"use client";

import { cuisineOptions, CuisinePill } from "@/features/restaurants";

export function Filters() {
  return cuisineOptions.map((cuisine) => (
    <CuisinePill key={cuisine} cuisine={cuisine} />
  ));
}
