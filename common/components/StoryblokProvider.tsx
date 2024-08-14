"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import { Restaurant } from "@/common/blocks/Restaurant";
import { Test } from "@/common/blocks/Test";
import { Hero } from "@/common/blocks/Hero";
import { SplitHero } from "@/common/blocks/SplitHero";
import {ImageGallery} from "@/common/blocks/ImageGallery";
import { TextSection } from "../blocks/TextSection";
import { BookSection } from "../blocks/BookSection";

const components = {
  restaurant: Restaurant,
  test: Test,
  hero: Hero,
  'split hero': SplitHero,
  'image gallery': ImageGallery,
  'text section': TextSection,
  'book section': BookSection,
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
