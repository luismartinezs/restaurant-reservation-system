import React, { ReactNode } from "react";
import { Text } from "@mantine/core";
import { cn } from "../utils";

export const SplitHero = ({
  logo,
  title,
  textContent,
  image,
  className,
  ratings,
}: {
  title: string;
  image: ReactNode;
  textContent?: string;
  logo?: ReactNode;
  className?: string;
  ratings?: ReactNode;
}) => {
  return (
    <div className={cn("relative -mx-[20px] !mb-0 py-0 xl:mb-12", className)}>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-center mx-8 my-12 md:ml-20 md:mr-10 md:my-10 md:w-1/2 md:h-[400px] gap-4">
          <div className="mb-8">{logo}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <Text c="gray.4" size="lg" fw={300}>
            {textContent}
          </Text>
          {ratings}
        </div>
        <div className="h-[250px] md:w-1/2 md:h-auto">
          <div className="h-full">{image}</div>
        </div>
      </div>
    </div>
  );
};
