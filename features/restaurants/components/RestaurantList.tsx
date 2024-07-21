import { Container, SimpleGrid } from '@mantine/core';

import { RestaurantCard } from './RestaurantCard';
import { RestaurantRead } from '../types';
import { DeleteButton } from './DeleteButton';

export const RestaurantList = ({
  restaurants
}: {
  restaurants: RestaurantRead[]
}) => (
  <Container>
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} asLink deleteButton={<DeleteButton id={restaurant.id} variant="subtle" />} />
      ))}
    </SimpleGrid>
  </Container>
);