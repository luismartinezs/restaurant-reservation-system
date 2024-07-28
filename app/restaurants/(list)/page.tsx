import { Container } from "@mantine/core";

import { RestaurantList } from "@/features/restaurants/server";
import { Search } from "@/features/search";
import { FiltersMenu } from "@/features/filters";

export default function Page() {
  return (
    <Container size="lg" px={0}>
      <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
        <FiltersMenu />
        <div>
          <Container px={0}>
            <Search />
            <RestaurantList />
          </Container>
        </div>
      </div>
    </Container>
  );
}
