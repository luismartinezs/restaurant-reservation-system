import NextImage from "next/image";
import {
  Text,
  Card,
  CardSection,
  Stack,
  Overlay,
  Image,
} from "@mantine/core";
import { RatingDisplay } from "@/features/ratings";
import Link from "next/link";
import { KEY } from "../../constants";
import { RestaurantRead } from "../../types";
import { CloudinaryImage } from "@/common/components/CloudinaryImage";
import { slugify } from "@/common/utils";

export const RestaurantCard = ({
  restaurant,
  image,
  rating,
  ratingCount,
}: {
  restaurant: RestaurantRead;
  image?: string;
  rating?: number;
  ratingCount?: number;
}) => {
  const isRated = ratingCount && ratingCount !== 0;
  const { name, id } = restaurant;
  const _image = image ?? `${id}_${slugify(name)}_interior_0001`;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      h="100%"
      className="group hover:scale-[1.01] transition-transform duration-300 ease-out has-[.restaurant-link:focus]:!outline has-[:focus]:outline-offset-2 has-[:focus]:!outline-1 has-[:focus]:!outline-primary"
      bg="dark.8"
    >
      <Link
        href={`/${KEY}/${id}`}
        className="peer restaurant-link focus:outline-none"
      >
        <CardSection className="">
          <CloudinaryImage
            folderPath="restaurants/thumbnails"
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
            imgId={_image}
            height={160}
            width={160}
            alt=""
            crop="fill"
            gravity="center"
            className="h-full w-full"
          />
        </CardSection>

        <Stack justify="space-between" mt="md">
          <Text fw={500}>{name}</Text>
          {isRated ? (
            <div className="flex gap-2">
              <RatingDisplay
                rating={rating}
                ratingCount={ratingCount}
                showNumber
              />
            </div>
          ) : (
            <Text size="sm" c="dimmed">
              No ratings yet
            </Text>
          )}
        </Stack>
      </Link>
      <Overlay
        color="#fff"
        className="opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-out pointer-events-none"
      />
    </Card>
  );
};
