"use client";

import { FOLDER_PATH } from "@/lib/cloudinary/constants";
import { CldImage, CldImageProps } from "next-cloudinary";

export function CloudinaryImage({
  src,
  alt = "",
  className = "",
  ...transformations
}: {
  src: string;
  alt?: string;
  className?: string;
} & Omit<CldImageProps, "alt" | "src">) {
  return (
    <CldImage src={`${FOLDER_PATH}/${src}`} alt={alt} className={className} {...transformations} />
  );
}
