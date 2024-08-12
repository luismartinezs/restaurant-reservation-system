// content type block
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";

export const Restaurant = ({
  blok,
  ...rest
}: {
  blok: RestaurantStoryblok;
}) => {
  return (
    <div {...storyblokEditable(blok)} className="-mt-8">
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} {...rest} />
      ))}
    </div>
  );
};
