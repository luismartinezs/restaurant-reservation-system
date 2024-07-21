import { Button } from "@mantine/core";
import { api } from "../api";
import { RestaurantList } from "./RestaurantList";
import Link from "next/link";

export async function List() {
  const { getAllRestaurants } = api();
  const restaurants = await getAllRestaurants();

  return (
    <>
      <RestaurantList restaurants={restaurants} />
      <Button component={Link} href="/scaffold/restaurants/new">
        Create
      </Button>
    </>
  );
}
