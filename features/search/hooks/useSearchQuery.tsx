"use client";

import { useSearchParams } from "next/navigation";
import { getSearchQuery } from "../utils";

export function useSearchQuery() {
  const searchParams = useSearchParams();

  return getSearchQuery({
    date: searchParams.get("date"),
    time: searchParams.get("time"),
    people: searchParams.get("people"),
  });
}
