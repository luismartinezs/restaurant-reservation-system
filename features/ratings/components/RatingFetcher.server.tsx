import "server-only";

import { RatingDisplay, RatingDisplayProps } from "./RatingDisplay";
import { Id } from "@/features/restaurants";
import { getRatingData } from "../utils";

export const RatingFetcher = async (
  props: Omit<RatingDisplayProps, "rating" | "ratingCount"> & {
    restaurantId: Id;
  }
) => {
  const { restaurantId } = props;
  const data = await getRatingData(restaurantId);

  return <RatingDisplay {...data} {...props} />;
};
