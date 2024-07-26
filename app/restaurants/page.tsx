import { Container } from "@mantine/core";

import { RestaurantList } from "@/app/features/restaurants";
import { Search } from "@/app/features/search";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Container>
      <Search />
      <RestaurantList />
    </Container>
  );
}
