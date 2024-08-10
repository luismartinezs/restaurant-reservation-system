// content type block
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";

export const Restaurant = ({ blok }: { blok: RestaurantStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
};
