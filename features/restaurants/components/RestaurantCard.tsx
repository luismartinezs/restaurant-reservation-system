import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Flex,
} from "@mantine/core";

import { RestaurantRead } from "../types";
import Link from "next/link";

export const RestaurantCard = ({
  restaurant,
  asLink = false,
  deleteButton,
}: {
  restaurant: RestaurantRead;
  asLink?: boolean;
  deleteButton?: React.ReactNode;
}) => {
  const { id, name, cuisine_type, location, seating_capacity } = restaurant;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
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
        Cuisine Type: {cuisine_type}
      </Text>
      <Text size="sm" c="dimmed">
        Seating Capacity: {seating_capacity}
      </Text>
     <Flex>
       {asLink && (
         <Button
           component={Link}
           href={`/scaffold/restaurants/${id}`}
           variant="subtle"
         >
           View
         </Button>
       )}
       <Button
         component={Link}
         href={`/scaffold/restaurants/${id}/edit`}
         variant="subtle"
       >
         Edit
       </Button>
       {deleteButton}
     </Flex>
    </Card>
  );
};
