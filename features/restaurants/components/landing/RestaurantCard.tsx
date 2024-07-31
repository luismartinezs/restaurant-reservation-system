import NextImage from "next/image";
import { Text, Card, Image, Badge, Group, CardSection, Stack } from "@mantine/core";
import { FaStar } from "react-icons/fa";
import { Display } from "@/features/ratings";

export const RestaurantCard = ({
  image,
  title,
  rating,
  ratingCount,
}: {
  image: string;
  title: string;
  rating?: number;
  ratingCount?: number;
}) => {
  const isRated = ratingCount && ratingCount !== 0;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
      <CardSection>
        <Image
          component={NextImage}
          src={image}
          height={160}
          width={160}
          alt={title}
        />
      </CardSection>

      <Stack justify="space-between" mt="md">
        <Text fw={500}>{title}</Text>
        {isRated ? (
          <div className="flex gap-2">
            <Display rating={rating} ratingCount={ratingCount} />
            <Badge color="pink" variant="light">
              <div className="flex gap-1 items-center">
                <Text c="red" size="sm">{rating}/5</Text>
              </div>
            </Badge>
          </div>
        ) : (
          <Text size="sm" c="dimmed">
            No ratings yet
          </Text>
        )}
      </Stack>
    </Card>
  );
};
