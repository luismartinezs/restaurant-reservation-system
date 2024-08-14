import { LogoStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { CloudinaryImage } from "../components/CloudinaryImage";
import { Image } from "@mantine/core";
import NextImage from "next/image";

export const Logo = ({ blok }: { blok?: LogoStoryblok }) => {
  if (!blok) {
    return null
  }
  const { image, cloudinaryId, url } = blok;
  const imageType: "cloudinary" | "asset" | "url" | "none" = (() => {
    if (image?.filename) return "asset";
    if (cloudinaryId) return "cloudinary";
    if (url) return "url";
    return "none";
  })();

  const getLogo = () => {
    switch (imageType) {
      case "cloudinary":
        return (
          <CloudinaryImage
            imgId={`${cloudinaryId as string}.png`}
            className="object-cover max-w-fit"
            width={50}
            height={50}
            alt=""
          />
        );
      case "asset":
        return (
          <Image
            component={NextImage}
            src={image?.filename as string}
            alt={image?.alt ?? ""}
            className="object-cover max-w-fit"
            width={50}
            height={50}
          />
        );
      case "url":
        return (
          <Image
            component={NextImage}
            src={url as string}
            alt=""
            className="object-cover max-w-fit"
            width={50}
            height={50}
          />
        );
      case "none":
        return null
    }
  };

  return getLogo();
};
