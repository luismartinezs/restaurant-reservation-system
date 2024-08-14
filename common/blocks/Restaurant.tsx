// content type block
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";
import { PageWithSidebar } from "../layouts/PageWithSidebar";
import { ComponentProps, ReactNode } from "react";
import { SimplePage } from "../layouts/SimplePage";

export const Restaurant = ({
  blok,
  ...rest
}: {
  blok: RestaurantStoryblok;
}) => {
  const { layout, body, hero } = blok;
  const hasSidebar = layout === "with-sidebar";

  const LayoutComponent = hasSidebar
    ? PageWithSidebar
    : SimplePage
  // lazy way of making typescript happy
  const layoutProps = (
    hasSidebar ? { sidebar: blok.aside, ...rest } : rest
  ) as ComponentProps<typeof LayoutComponent>;

  return (
    <div {...storyblokEditable(blok)} className="-mt-8">
      {hero?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} {...rest} />
      ))}
      <LayoutComponent {...layoutProps}>
        {body?.map((nestedBlok) => (
          <StoryblokComponent
            blok={nestedBlok}
            key={nestedBlok._uid}
            {...rest}
          />
        ))}
      </LayoutComponent>
    </div>
  );
};
