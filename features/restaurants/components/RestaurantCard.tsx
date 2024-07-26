// import NextImage from "next/image";

import {
  Card,
  // CardSection,
  // Badge,
  // Button,
  // Image,
  Text,
  Group,
} from "@mantine/core";

import { RestaurantRead } from "../types";
import Link from "next/link";
import { KEY } from "../constants";

export const RestaurantCard = ({
  restaurant,
  rating,
  ratingCount,
}: {
  restaurant: RestaurantRead;
  rating?: number;
  ratingCount?: number;
}) => {
  const { id, name, cuisine_type, location, seating_capacity } = restaurant;
  const noRatings = typeof rating === 'undefined' || ratingCount === 0;

  // const bookings: number = 5;
  // const availableTimes: string[] = ["12:00 PM", "12:30 PM", "13:00 PM", "13:30 PM"];

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      component={Link}
      href={`/${KEY}/${id}`}
    >
      {/* <CardSection>
        <Image
          component={NextImage}
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          height={160}
          width={160}
          alt={name}
        />
      </CardSection> */}

      <Group align="apart" mb="xs">
        <Text fw={500}>{name}</Text>
      </Group>

      {/* <Group align="apart" mb="xs">
        <Badge color="pink" variant="light">
          {cuisine_type}
        </Badge>
      </Group> */}

      <Group gap={5}>
        {!noRatings && [...Array(5)].map((_, i) => (
          <Text key={i} c={i < rating ? "yellow" : "gray"}>
            ★
          </Text>
        ))}
        <Text size="sm" c="dimmed">
          {noRatings
            ? "No ratings yet"
            : `${ratingCount} ${ratingCount === 1 ? "rating" : "ratings"}`}
        </Text>
      </Group>

      <Text size="sm" c="dimmed" mt="sm">
        {[cuisine_type, location].join(" • ")}
      </Text>

      {/* <Text size="sm" mt="sm">
        Booked {bookings} {bookings === 1 ? "time" : "times"} today
      </Text> */}

      {/* <Group mt="md" gap="xs">
        {availableTimes.map((time) => (
          <Button key={time} variant="light" color="blue" size="xs">
            {time}
          </Button>
        ))}
      </Group> */}
    </Card>
  );
};
