"use client";

import { useSearchParams } from "next/navigation";
import { getFilterQuery } from "../utils";

export function useFilterQuery() {
  const searchParams = useSearchParams();

  return getFilterQuery({
    cuisine: searchParams.get("cuisine"),
  });
}
