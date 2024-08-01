import React from "react";
import { Title, Text } from "@mantine/core";

export function FullBleedHero({
  image,
  title,
  subtitle,
  link,
}: {
  image: React.ReactNode;
  title: string;
  subtitle: string;
  link?: React.ReactNode;
}) {
  return (
    <div className="relative -mx-[20px] !mb-0 py-0 xl:mb-12 -mt-[18px]">
      <div className="relative h-[400px] w-full overflow-hidden">
        {image}
        <div className="absolute inset-0 bg-stone-900 object-cover opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center text-center">
        <div className="flex items-center">
          <h1 className="text-3xl md:text-5xl text-white font-bold pb-4">
            {title}
          </h1>
        </div>
        <p className="font-semibold text-md md:text-xl text-white">{subtitle}</p>
        {link}
      </div>
    </div>
  );
}
