import NextImage from "next/image";
import {
  Card,
  CardSection,
  SimpleGrid,
  Text,
  Image,
  Group,
  Overlay,
} from "@mantine/core";
import { api } from "../../api";
import { getLocationsAndCount } from "../../utils";
import Link from "next/link";
import { KEY } from "../../constants";

export const SectionByLocation = async () => {
  const restaurants = await api().getAllRestaurants();
  const locationsAndCount = getLocationsAndCount(restaurants).sort(
    (a, b) => b.count - a.count
  );

  return (
    <div>
      <Text size="lg" fw={600}>
        Browse by Locations
      </Text>
      <Text mb="lg">Discover restaurants in these locations</Text>
      <SimpleGrid cols={{ base: 2, sm: 5 }} spacing="lg">
        {locationsAndCount.slice(0, 5).map(({ location }) => (
          <Card
            key={location}
            shadow="sm"
            radius="md"
            withBorder
            component={Link}
            href={`/${KEY}?location=${location}`}
            className="group hover:scale-[1.01] transition-transform duration-300 ease-out"
          >
            <CardSection>
              <Overlay
                color="#fff"
                className="opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out"
              />
              <Image
                component={NextImage}
                src={`https://res.cloudinary.com/dicyllvry/image/upload/v1722433325/restaurant-reservation-system/phuket_nwegsz.jpg`}
                height={160}
                width={160}
                alt={location}
              />
            </CardSection>
            <Group justify="space-between" mt="md">
              <Text fw={700} size="xl" className="text-center">
                {location}
              </Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};
