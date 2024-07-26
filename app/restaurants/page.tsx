import { RestaurantList } from "@/features/restaurants";
import { Search } from "@/features/search";
import { Container } from "@mantine/core";

export const revalidate = 0;

export default function Page() {

  return (
    <Container>
      <Search />
      <RestaurantList />
    </Container>
  );
}
