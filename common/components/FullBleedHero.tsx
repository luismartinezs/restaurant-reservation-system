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
      <div className="relative h-[500px] w-full overflow-hidden">
        {image}
        <div className="absolute inset-0 bg-stone-900 object-cover opacity-50"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center text-center">
        <Text className="text-xl text-stone-100 font-bold text-shadow">
          {subtitle}
        </Text>
        <div className="flex items-center">
          <Title order={2} className="mt-4 text-shadow !text-sky-200">
            {title}
          </Title>
        </div>
        {link}
      </div>
    </div>
  );
}
