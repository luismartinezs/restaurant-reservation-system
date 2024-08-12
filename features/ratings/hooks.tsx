import "client-only";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getParamId } from "@/app/restaurants/[id]/utils";
import { getRatingData } from "./utils";
import { RatingDisplayProps } from "./components/RatingDisplay";

export function useRating() {
  const [rating, setRating] = useState<Pick<
    RatingDisplayProps,
    "rating" | "ratingCount"
  > | null>(null);
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const params = useParams<{ id: string }>();

  const id = getParamId(params);

  useEffect(() => {
    async function fetchRating() {
      setStatus("loading");
      try {
        const rating = await getRatingData(id);
        setRating(rating);
        setStatus("success");
      } catch (e) {
        setStatus("error");
      }
    }
    fetchRating();
  }, [id]);

  return { ...rating, status };
}
