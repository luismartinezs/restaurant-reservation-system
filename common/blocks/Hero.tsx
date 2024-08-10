import { HeroStoryblok } from "@/lib/storyblok/component-types-sb";
import { FullBleedHero } from "../components/FullBleedHero";
import { Image } from "./Image";

export const Hero = ({ blok }: { blok: HeroStoryblok }) => {
  const { title, subtitle, image, cloudinaryId, imageUrl } = blok;

  return (
    <FullBleedHero
      image={<Image blok={image && image[0]} />}
      title={title}
      subtitle={subtitle}
    />
  );
};
