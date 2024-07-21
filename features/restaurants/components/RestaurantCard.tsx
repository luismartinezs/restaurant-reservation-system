import {
  Card,
  Text,
  Group,
  Badge,
  CardProps,
  PolymorphicComponentProps,
} from "@mantine/core";

import { RestaurantRead } from "../types";

export const RestaurantCard = ({
  restaurant,
  asLink = false,
}: {
  restaurant: RestaurantRead;
  asLink?: boolean;
}) => {
  const { id, name, cuisine_type, location, seating_capacity } = restaurant;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      component={asLink ? "a" : "div"}
      {...(asLink ? { href: `/scaffold/restaurants/${id}` } : {})}
    >
      <Group mt="md" mb="xs">
        <Text fw={500}>{name}</Text>
        <Badge color="pink" variant="light">
          {cuisine_type}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        Location: {location}
      </Text>
      <Text size="sm" c="dimmed">
        Seating Capacity: {seating_capacity}
      </Text>
    </Card>
  );
};
