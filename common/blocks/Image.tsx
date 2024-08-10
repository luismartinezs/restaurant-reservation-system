import { ImageStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { CloudinaryImage } from "../components/CloudinaryImage";
import { Image as MImage } from "@mantine/core";
import NextImage from "next/image";

function NoImage() {
  return (
    <div className="bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 h-full w-full"></div>
  );
}

export const Image = ({ blok }: { blok?: ImageStoryblok }) => {
  const _width = blok?.width ? Number(blok.width) : 1920;
  const _height = blok?.height ? Number(blok.height) : 400;
  if (!blok) {
    return <NoImage />;
  }
  const { image, cloudinaryId, url } = blok;
  const imageType: "cloudinary" | "asset" | "url" | "none" = (() => {
    if (image?.filename) return "asset";
    if (cloudinaryId) return "cloudinary";
    if (url) return "url";
    return "none";
  })();

  const getImage = () => {
    switch (imageType) {
      case "cloudinary":
        return (
          <CloudinaryImage
            imgId={`${cloudinaryId as string}.png`}
            className="object-cover max-w-fit min-w-[100%] h-full"
            width={_width}
            height={_height}
            alt=""
          />
        );
      case "asset":
        return (
          <MImage
            component={NextImage}
            src={image?.filename as string}
            alt={image?.alt ?? ""}
            className="object-cover max-w-fit min-w-[100%] h-full"
            width={_width}
            height={_height}
          />
        );
      case "url":
        return (
          <MImage
            component={NextImage}
            src={url as string}
            alt=""
            className="object-cover max-w-fit min-w-[100%] h-full"
            width={_width}
            height={_height}
          />
        );
      case "none":
        return <NoImage />;
    }
  };

  return getImage();
};
