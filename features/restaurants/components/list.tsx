import { Button, Container, SimpleGrid } from "@mantine/core";
import { api } from "../api";
import Link from "next/link";
import { RestaurantCard } from "./RestaurantCard";
import { DeleteButton } from "./DeleteButton";

export async function List() {
  const { getAllRestaurants } = api();
  const restaurants = await getAllRestaurants();

  return (
    <>
      <Container>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              asLink
              deleteButton={
                <DeleteButton id={restaurant.id} variant="subtle" />
              }
            />
          ))}
        </SimpleGrid>
        <Button component={Link} mt={16} href="/scaffold/restaurants/new">
          Create
        </Button>
      </Container>
    </>
  );
}
