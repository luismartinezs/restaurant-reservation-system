import { Pill } from "@mantine/core";

const cuisineColorMap = {
  default: "gray",
};

export function CuisinePill({ cuisine }: { cuisine: string }) {
  const color =
    cuisine in cuisineColorMap
      ? cuisineColorMap[cuisine as keyof typeof cuisineColorMap]
      : cuisineColorMap.default;

  return <Pill color={color}>{cuisine}</Pill>;
}
