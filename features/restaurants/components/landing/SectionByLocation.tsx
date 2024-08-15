import NextImage from "next/image";
import {
  Card,
  CardSection,
  SimpleGrid,
  Text,
  Group,
  Overlay,
  Image,
} from "@mantine/core";
import { api } from "../../api";
import { getLocationsAndCount } from "../../utils";
import Link from "next/link";
import { KEY } from "../../constants";
import { CloudinaryImage } from "@/common/components/CloudinaryImage";
import { slugify } from "@/common/utils";

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
            className="group hover:scale-[1.01] transition-transform duration-300 ease-out has-[.restaurant-link:focus]:!outline has-[:focus]:outline-offset-2 has-[:focus]:!outline-1 has-[:focus]:!outline-primary"
          >
            <Link
              href={`/${KEY}?location=${location}`}
              className="peer restaurant-link focus:outline-none"
            >
              <CardSection>
                <CloudinaryImage
                  folderPath="locations"
                  imgId={`${slugify(location)}.png`}
                  fallback={
                    <Image
                      component={NextImage}
                      src={`https://placehold.co/512x512/242424/FFF.png?text=${location}`}
                      className="h-full w-full"
                      alt=""
                      width={160}
                      height={160}
                    />
                  }
                  height={160}
                  width={160}
                  alt={location}
                  crop="fill"
                  gravity="center"
                  className="h-full w-full"
                />
              </CardSection>
              <Group justify="space-between" mt="md">
                <Text fw={700} size="xl" className="text-center">
                  {location}
                </Text>
              </Group>
            </Link>
            <Overlay
              color="#fff"
              className="opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out pointer-events-none"
            />
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};
