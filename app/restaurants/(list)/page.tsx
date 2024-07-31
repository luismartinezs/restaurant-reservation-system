import { Container, Title } from "@mantine/core";

import {
  RestaurantList,
  RestaurantListSkeleton,
} from "@/features/restaurants/server";
import { Search, SearchSkeleton } from "@/features/search";
import { FiltersMenu } from "@/features/filters";
import { Suspense } from "react";

export default function Page() {
  return (
    <Container size="lg" px={0}>
      <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
        <FiltersMenu />
        <div>
          <Container px={0}>
            <Title order={1} mb="xs">
              RESTAURANTS
            </Title>
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
            <Suspense fallback={<RestaurantListSkeleton />}>
              <RestaurantList />
            </Suspense>
          </Container>
        </div>
      </div>
    </Container>
  );
}
