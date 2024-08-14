// content type block
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";
import { PageWithSidebar } from "../layouts/PageWithSidebar";
import { ComponentProps } from "react";
import { SimplePage } from "../layouts/SimplePage";
import { SecondaryNav } from "../components/SecondaryNav";
import { ScrollHandler } from "../components/ScrollHandler";

export const Restaurant = ({
  blok,
  ...rest
}: {
  blok: RestaurantStoryblok;
}) => {
  const { layout, body, hero } = blok;
  const hasSidebar = layout === "with-sidebar";
  const navBloks = body?.filter((nestedBlok) => !!nestedBlok.navTitle);

  const LayoutComponent = hasSidebar ? PageWithSidebar : SimplePage;
  // lazy way of making typescript happy
  const layoutProps = (
    hasSidebar
      ? { sidebar: blok.aside, nav: <SecondaryNav bloks={navBloks} />, ...rest }
      : { nav: <SecondaryNav bloks={navBloks} />, ...rest }
  ) as ComponentProps<typeof LayoutComponent>;

  return (
    <div {...storyblokEditable(blok)} className="-mt-8">
      {hero?.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} {...rest} />
      ))}
      <LayoutComponent {...layoutProps}>
        <div className="mt-16">
          {body?.map((nestedBlok) => (
            <StoryblokComponent
              blok={nestedBlok}
              key={nestedBlok._uid}
              {...rest}
            />
          ))}
        </div>
      </LayoutComponent>
      <ScrollHandler />
    </div>
  );
};
