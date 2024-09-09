import { Badge, Group, Text } from "@mantine/core";
import { Star } from "./Star";

export interface RatingDisplayProps {
  rating?: number;
  ratingCount?: number;
  showCount?: boolean;
  showNumber?: boolean;
}

export function RatingDisplay({
  rating,
  ratingCount,
  showCount = false,
  showNumber = false,
}: RatingDisplayProps) {
  const noRatings = typeof rating === "undefined" || ratingCount === 0;

  if (noRatings) {
    return <Text>No ratings yet</Text>;
  }

  return (
    <Group gap={5}>
      {[...Array(5)].map((_, i) => (
        <Star rating={rating} index={i} key={i} />
      ))}
      {showNumber && (
        <Badge color="pink" variant="light">
          <div className="flex gap-1 items-center">
            <Text c="red" size="sm">
              {rating}/5
            </Text>
          </div>
        </Badge>
      )}
      {showCount && (
        <Text size="sm">
          {`${ratingCount} ${ratingCount === 1 ? "rating" : "ratings"}`}
        </Text>
      )}
    </Group>
  );
}
