import React, { ReactNode } from "react";
import { cn } from "../utils";

export function FullBleedHero({
  image,
  title,
  subtitle,
  widget,
  className,
  content,
}: {
  image: ReactNode;
  title?: string;
  subtitle?: string;
  widget?: ReactNode;
  className?: string;
  content?: ReactNode;
}) {
  return (
    <div className={cn("relative -mx-[20px] !mb-0 py-0 xl:mb-12", className)}>
      <div className="relative h-[400px] w-full overflow-hidden">
        {image}
        <div className="absolute inset-0 bg-stone-900 object-cover opacity-40"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center text-center gap-2">
        {content ? (
          content
        ) : (
          <>
            {title ? (
              <div className="flex items-center">
                <h1 className="text-3xl md:text-5xl text-white font-bold">
                  {title}
                </h1>
              </div>
            ) : null}
            {subtitle ? (
              <p className="mt-2 font-semibold text-xl md:text-2xl text-white">
                {subtitle}
              </p>
            ) : null}
            {widget}
          </>
        )}
      </div>
    </div>
  );
}
