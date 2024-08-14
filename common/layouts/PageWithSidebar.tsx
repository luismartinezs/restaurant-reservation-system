import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";
import { Container } from "@mantine/core";
import { StoryblokComponent } from "@storyblok/react/rsc";
import { LayoutProps } from "./types";

export const PageWithSidebar = ({
  children,
  nav,
  sidebar,
  ...rest
}: LayoutProps & {
  sidebar: RestaurantStoryblok["aside"];
}) => {
  return (
    <Container size="lg">
      <article className="flex flex-col lg:flex-row items-start justify-start lg:gap-8">
        <div className="lg:w-2/3 order-2 lg:order-1">
          {nav}
          {children}
        </div>
        <aside className="lg:w-1/3 order-1 lg:order-2">
          {sidebar?.map((nestedBlok) => (
            <StoryblokComponent
              blok={nestedBlok}
              key={nestedBlok._uid}
              {...rest}
            />
          ))}
        </aside>
      </article>
    </Container>
  );
};
