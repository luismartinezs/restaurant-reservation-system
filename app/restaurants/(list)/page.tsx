import { Container } from "@mantine/core";

import { RestaurantList } from "@/features/restaurants/server";
import { Search } from "@/features/search";

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
