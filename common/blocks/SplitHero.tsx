import { SplitHeroStoryblok } from "@/lib/storyblok/component-types-sb";
import React, { Suspense } from "react";
import { SplitHero as SplitHeroComponent } from "../components/SplitHero";
import invariant from "tiny-invariant";
import { Image } from "./Image";
import { Logo } from "./Logo";
import { PageContext } from "@/app/restaurants/[id]/types";
import { RatingFetcher } from "@/features/ratings/components/RatingFetcher.server";
import { Loader } from "@mantine/core";

export const SplitHero = ({
  blok,
  context,
}: {
  blok: SplitHeroStoryblok;
  context: PageContext;
}) => {
  const { title, textContent, logo, image } = blok;

  invariant(title, "Missing title");
  invariant(image, "Missing image");

  return (
    <SplitHeroComponent
      title={title}
      textContent={textContent}
      image={<Image blok={image[0]} />}
      logo={<Logo blok={logo && logo[0]} />}
      ratings={
        <Suspense fallback={<Loader />}>
          <RatingFetcher
            restaurantId={context.restaurant.id}
            showCount
            showNumber
          />
        </Suspense>
      }
    />
  );
};
