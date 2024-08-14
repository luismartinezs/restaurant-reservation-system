// should wrap all storyblok components with this to add extra functionality
import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokNavId } from "../utils";
import { ComponentPropsWithoutRef } from "react";

export function BlokWrapper({
  blok,
  children,
  ...rest
}: {
  blok: {
    _uid: string;
    navTitle?: string;
  };
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"div">) {
  return (
    // 134px is to offset the added padding of 70px plus the SectionContainer padding of 64px
    <div {...storyblokEditable(blok)} {...rest}>
      <div id={getStoryblokNavId(blok)} className="scroll-mt-[134px]"></div>
      <>{children}</>
    </div>
  );
}
