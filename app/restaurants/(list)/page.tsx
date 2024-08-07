import { Container, Title } from "@mantine/core";

import {
  api,
  RestaurantList,
  RestaurantListSkeleton,
} from "@/features/restaurants/server";
import { Search, SearchSkeleton } from "@/features/search";
import { FiltersMenu } from "@/features/filters";
import { Suspense } from "react";
import { CuisineFilters } from "@/features/filters/components/CuisineFilters";
import { LocationFilters } from "@/features/filters/components/LocationFilters";
import { getLocationsAndCount } from "@/features/restaurants";

export default async function Page() {
  const restaurants = await api().getAllRestaurants();
  const locationOptions = getLocationsAndCount(restaurants)
    .sort((a, b) => b.count - a.count)
    .map(({ location }) => location);

  return (
    <Container size="lg" px={0}>
      <div className="flex gap-4 md:gap-8 flex-col md:flex-row">
        <FiltersMenu
          filters={
            <>
              <CuisineFilters />
              <Suspense fallback={<div>Loading...</div>}>
                <LocationFilters locationOptions={locationOptions} />
              </Suspense>
            </>
          }
        />
        <div>
          <Container px={0}>
            <Title order={1} mb="xs">
              RESTAURANTS
            </Title>
            <Suspense fallback={<SearchSkeleton />}>
              <Search title="Make a free reservation" />
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
