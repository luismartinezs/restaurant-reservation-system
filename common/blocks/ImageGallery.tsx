import { ImageGalleryStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { Image } from "./Image";
import { SectionContainer } from "@/common/components/SectionContainer";

export const ImageGallery = ({ blok }: { blok: ImageGalleryStoryblok }) => {
  const { images } = blok;

  if (!images || images.length === 0) return;

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {images.slice(0, 3).map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
          >
            <Image blok={image} className="w-full h-full object-cover" />
            {index === images.length - 1 && images.length > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{images.length - 5} More
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
