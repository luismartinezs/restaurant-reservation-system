"use client";

import { BASE_PATH } from "@/lib/cloudinary/constants";
import { CldImage, CldImageProps } from "next-cloudinary";

export function CloudinaryImage({
  folderPath = '',
  imgId,
  alt = "",
  className = "",
  ...transformations
}: {
  folderPath?: string;
  imgId: string;
  alt?: string;
  className?: string;
} & Omit<CldImageProps, "alt" | "src">) {
  return (
    <CldImage src={`${BASE_PATH}/${folderPath}/${imgId}`} alt={alt} className={className} {...transformations} />
  );
}
