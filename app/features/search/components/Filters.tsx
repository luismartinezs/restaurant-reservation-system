"use client";

import { cuisineOptions, CuisinePill } from "@/app/features/restaurants";

export function Filters() {
  return cuisineOptions.map((cuisine) => (
    <CuisinePill key={cuisine} cuisine={cuisine} />
  ));
}
