import {
  ImageGalleryStoryblok,
  ImageStoryblok,
} from "@/lib/storyblok/component-types-sb";
import React from "react";
import { Image } from "./Image";
import { SectionContainer } from "@/common/components/SectionContainer";
import { cn } from "../utils";
import { ToggleModal } from "../components/ToggleModal";

function ImageDisplay({
  image,
  className,
}: {
  image: ImageStoryblok;
  className?: string;
}) {
  return (
    <div className={cn(`relative overflow-hidden`, className)}>
      <Image blok={image} className="w-full h-full object-cover" />
    </div>
  );
}

export const ImageGallery = ({ blok }: { blok: ImageGalleryStoryblok }) => {
  const { images } = blok;

  if (!images || images.length === 0) return;

  return (
    <SectionContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {images.slice(0, 3).map((image, index) => {
          const isFirst = index === 0;
          const isThird = index === 2;
          const showGalleryBtn = isThird && images.length > 3;
          const remainingImageCount = images.length - 3;

          if (showGalleryBtn) {
            return (
              <div
                className="relative aspect-square w-full overflow-hidden"
                key={index}
              >
                <ToggleModal
                  toggler={
                    <>
                      <ImageDisplay
                        className={`relative overflow-hidden ${
                          isFirst ? "md:col-span-2 md:row-span-2" : ""
                        }`}
                        image={image}
                      />
                      <div className="absolute inset-0 bg-stone-900 object-cover opacity-40"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{remainingImageCount} more
                        </span>
                      </div>
                    </>
                  }
                  content={
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {images.map((image, index) => {
                        return <ImageDisplay key={index} image={image} />;
                      })}
                    </div>
                  }
                ></ToggleModal>
              </div>
            );
          }

          return (
            <ImageDisplay
              key={index}
              className={`relative overflow-hidden ${
                isFirst ? "md:col-span-2 md:row-span-2" : ""
              }`}
              image={image}
            />
          );
        })}
      </div>
    </SectionContainer>
  );
};
