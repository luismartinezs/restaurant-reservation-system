import NextImage from "next/image";

import {
  Card,
  // CardSection,
  // Badge,
  // Button,
  Image,
  Text,
  Group,
  Skeleton,
  Overlay,
  CardSection,
  Button,
} from "@mantine/core";

import { RestaurantRead } from "../types";
import Link from "next/link";
import { KEY, MIN_SEATS_DISPLAY } from "../constants";
import { Display } from "@/features/ratings";
import { CloudinaryImage } from "@/common/components/CloudinaryImage";
import { slugify } from "@/common/utils";
import { AvailableTimes } from "@/features/reservations/components/AvailableTimes";

export const RestaurantCard = ({
  restaurant,
  rating,
  ratingCount,
  availableSeats,
  alwaysShowAvailableSeats,
  showAvailableTimes,
}: {
  restaurant: RestaurantRead;
  rating?: number;
  ratingCount?: number;
  availableSeats?: number;
  alwaysShowAvailableSeats?: boolean;
  showAvailableTimes?: boolean;
}) => {
  const { id, name, cuisine_type, location, seating_capacity } = restaurant;
  const noRatings = typeof rating === "undefined" || ratingCount === 0;

  return (
    <Card
      shadow="sm"
      pt={0}
      radius="md"
      withBorder
      className="group hover:scale-[1.01] transition-transform duration-300 ease-out has-[.restaurant-link:focus]:!outline has-[:focus]:outline-offset-2 has-[:focus]:!outline-1 has-[:focus]:!outline-[#c2255c]"
    >
      <Link
        href={`/${KEY}/${id}`}
        className="peer restaurant-link focus:outline-none"
      >
        <CardSection pb="md">
          <CloudinaryImage
            folderPath="restaurants/thumbnails"
            imgId={`${id}_${slugify(name)}_interior_0001`}
            fallback={
              <Image
                component={NextImage}
                src={`https://placehold.co/512x512/242424/FFF.png?text=${name.replace(
                  /\W/,
                  "+"
                )}`}
                className="h-full w-full"
                alt=""
                width={160}
                height={160}
              />
            }
            height={160}
            width={160}
            alt={name}
            crop="fill"
            gravity="center"
            className="h-full w-full"
          />
        </CardSection>

        <Group align="apart" mb="xs">
          <Text fw={500}>{name}</Text>
        </Group>

        {/* <Group align="apart" mb="xs">
        <Badge color="pink" variant="light">
          {cuisine_type}
        </Badge>
      </Group> */}

        <Display rating={rating} ratingCount={ratingCount} showCount />

        <Text size="sm" c="dimmed" mt="sm">
          {[cuisine_type, location].join(" • ")}
        </Text>

        {/* <Text size="sm" mt="sm">
        Booked {bookings} {bookings === 1 ? "time" : "times"} today
      </Text> */}

        {((availableSeats && availableSeats <= MIN_SEATS_DISPLAY) ||
          alwaysShowAvailableSeats) && (
          <Text size="sm" mt="sm" c="red">
            Only {availableSeats} {availableSeats === 1 ? "seat" : "seats"}{" "}
            available
          </Text>
        )}
      </Link>

      <Overlay
        color="#fff"
        className="opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out pointer-events-none peer-focus:opacity-20"
      />

      {showAvailableTimes && <AvailableTimes restaurantId={id} />}
    </Card>
  );
};

export const RestaurantCardSkeleton = () => {
  return <Skeleton p="lg" radius="md" h={360} w={215} />;
};
