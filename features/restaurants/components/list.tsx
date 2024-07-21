import { Card, Text, Group, Badge, Container, SimpleGrid } from '@mantine/core';

import { getAllRestaurants } from "../api";
import { Restaurant } from "../types";

export async function List() {
  const restaurants = await getAllRestaurants()

  return (
    <RestaurantList restaurants={restaurants} />
  )
}

const RestaurantCard = ({ restaurant }:{
  restaurant: Restaurant
}) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Group mt="md" mb="xs">
      <Text fw={500}>{restaurant.name}</Text>
      <Badge color="pink" variant="light">
        {restaurant.cuisine_type}
      </Badge>
    </Group>

    <Text size="sm" c="dimmed">
      Location: {restaurant.location}
    </Text>
    <Text size="sm" c="dimmed">
      Seating Capacity: {restaurant.seating_capacity}
    </Text>
  </Card>
);

const RestaurantList = ({
  restaurants
}: {
  restaurants: Restaurant[]
}) => (
  <Container>
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </SimpleGrid>
  </Container>
);