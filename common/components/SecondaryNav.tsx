import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { getStoryblokNavId } from "../utils";
import NextLink from "next/link";

export const SecondaryNav = ({
  bloks,
}: {
  bloks: RestaurantStoryblok["body"];
}) => {
  if (!bloks || bloks.length === 0) return null;

  return (
    <nav
      aria-label="secondary"
      className="bg-background py-5 border-b border-stone-600"
    >
      <ul className="flex gap-6">
        {bloks?.map((blok) => (
          <li key={blok._uid}>
            <NextLink href={`#${getStoryblokNavId(blok)}`}>
              {blok.navTitle}
            </NextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
