"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import { Restaurant } from "@/common/blocks/Restaurant";
import { Test } from "@/common/blocks/Test";
import { Hero } from "@/common/blocks/Hero";
import { SplitHero } from "../blocks/SplitHero";

const components = {
  restaurant: Restaurant,
  test: Test,
  hero: Hero,
  'split hero': SplitHero,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
