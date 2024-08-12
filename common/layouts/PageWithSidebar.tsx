import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";
import { Container } from "@mantine/core";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import React, { ReactNode } from "react";

export const PageWithSidebar = ({
  children,
  sidebar,
  ...rest
}: {
  children: ReactNode;
  sidebar: RestaurantStoryblok["aside"];
}) => {
  return (
    <Container size="lg">
      <article className="flex flex-col md:flex-row items-start justify-start">
        <div className="md:w-2/3 order-2 md:order-1">{children}</div>
        <aside className="md:w-1/3 order-1 md:order-2">
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
