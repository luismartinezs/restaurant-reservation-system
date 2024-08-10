"use client";

import NextImage from "next/image";
import { Image } from "@mantine/core";
import { BASE_PATH } from "@/lib/cloudinary/constants";
import { CldImage, CldImageProps } from "next-cloudinary";
import { ReactNode, useState } from "react";

export function CloudinaryImage({
  folderPath = "",
  imgId,
  alt = "",
  className = "",
  fallback,
  fallbackUrl,
  ...transformations
}: {
  folderPath?: string;
  imgId: string;
  alt?: string;
  className?: string;
  fallback?: ReactNode;
  fallbackUrl?: string;
} & Omit<CldImageProps, "alt" | "src">) {
  const [imageExists, setImageExists] = useState<boolean | null>(null);
  const imageSrc = `${BASE_PATH}/${folderPath ? `${folderPath}/` : ""}${imgId}`;

  if (imageExists === false) {
    if (fallbackUrl) {
      return (
        <Image
          component={NextImage}
          src={fallbackUrl}
          alt=""
          className={className}
          width={transformations.width ?? 160}
          height={transformations.height ?? 160}
        />
      );
    }
    return fallback ?? null;
  }

  console.log(imageSrc);


  return (
    <CldImage
      src={imageSrc}
      onError={(e) => {
        setImageExists(false);
      }}
      alt={alt}
      className={className}
      {...transformations}
    />
  );
}
