import { storyblokEditable } from "@storyblok/react/rsc";
import { TestStoryblok } from "@/lib/storyblok/component-types-sb";

export const Test = ({ blok }: { blok: TestStoryblok }) => {
  return (
    <div className="text-2xl mb-10" {...storyblokEditable(blok)}>
      {blok.test}
    </div>
  );
};
