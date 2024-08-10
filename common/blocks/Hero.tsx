import { HeroStoryblok } from "@/lib/storyblok/component-types-sb";
import { FullBleedHero } from "../components/FullBleedHero";
import { CloudinaryImage } from "../components/CloudinaryImage";
import { Image } from "@mantine/core";
import NextImage from "next/image";

export const Hero = ({ blok }: { blok: HeroStoryblok }) => {
  const { title, subtitle, image, cloudinaryId, imageUrl } = blok;
  const imageType: "cloudinary" | "asset" | "url" | "none" = (() => {
    if (image?.filename) return "asset";
    if (cloudinaryId) return "cloudinary";
    if (imageUrl) return "url";
    return "none";
  })();

  const getImage = () => {
    switch (imageType) {
      case "cloudinary":
        return (
          <CloudinaryImage
            imgId={`${cloudinaryId as string}.png`}
            className="object-cover max-w-fit"
            width={1920}
            height={400}
            alt=""
          />
        );
      case "asset":
        return (
          <Image
            component={NextImage}
            src={image?.filename as string}
            alt={image?.alt ?? ''}
            className="object-cover max-w-fit"
            width={1920}
            height={400}
          />
        );
      case "url":
        return (
          <Image
            component={NextImage}
            src={imageUrl as string}
            alt=""
            className="object-cover max-w-fit"
            width={1920}
            height={400}
          />
        );
      case "none":
        return (
          <div className="bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 h-full w-full"></div>
        );
    }
  };

  return (
    <FullBleedHero
      className="-mt-8"
      image={getImage()}
      title={title}
      subtitle={subtitle}
    />
  );
};
