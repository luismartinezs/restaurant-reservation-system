import { Group, Text } from "@mantine/core";
import { FaStar } from "react-icons/fa";

export function Display({
  rating,
  ratingCount,
  showCount = false,
}: {
  rating?: number;
  ratingCount?: number;
  showCount?: boolean;
}) {
  const noRatings = typeof rating === "undefined" || ratingCount === 0;

  return (
    <Group gap={5}>
      {!noRatings &&
        [...Array(5)].map((_, i) => (
          <Text key={i} c={i < rating ? "red" : "gray"}>
            <FaStar />
          </Text>
        ))}
      {showCount && (
        <Text size="sm" c="dimmed">
          {noRatings
            ? "No ratings yet"
            : `${ratingCount} ${ratingCount === 1 ? "rating" : "ratings"}`}
        </Text>
      )}
    </Group>
  );
}
