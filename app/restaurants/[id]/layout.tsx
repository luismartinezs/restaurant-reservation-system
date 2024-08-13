import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import StoryblokBridgeLoader from "@storyblok/react/bridge-loader";

import { Restaurant } from "@/common/blocks/Restaurant";
import { Test } from "@/common/blocks/Test";
import { Hero } from "@/common/blocks/Hero";
import { SplitHero } from "@/common/blocks/SplitHero";
import { ImageGallery } from "@/common/blocks/ImageGallery";
import { TextSection } from "@/common/blocks/TextSection";
import { BookSection } from "@/common/blocks/BookSection";
import { Menu } from "@/common/blocks/Menu";
import { SocialShare } from "@/common/blocks/SocialShare";

const components = {
  restaurant: Restaurant,
  test: Test,
  hero: Hero,
  "split hero": SplitHero,
  "image gallery": ImageGallery,
  "text section": TextSection,
  "book section": BookSection,
  menu: Menu,
  "social share": SocialShare
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <StoryblokBridgeLoader options={{}} />
    </>
  );
}
