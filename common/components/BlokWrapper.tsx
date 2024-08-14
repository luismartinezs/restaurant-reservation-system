// should wrap all storyblok components with this to add extra functionality
import { storyblokEditable } from "@storyblok/react/rsc";
import { getStoryblokNavId } from "../utils";

export function BlokWrapper({
  blok,
  children,
}: {
  blok: {
    _uid: string;
    navTitle?: string;
  };
  children: React.ReactNode;
}) {
  return (
    <div  {...storyblokEditable(blok)} className="relative">
      <div id={getStoryblokNavId(blok)} className="relative pt-[70px] -mt-[70px]"></div>
      <>{children}</>
    </div>
  );
}
