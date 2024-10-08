import { RestaurantStoryblok } from "@/lib/storyblok/component-types-sb";
import { Container } from "@mantine/core";
import { StoryblokComponent } from "@storyblok/react/rsc";
import { LayoutProps } from "./types";
import { cn } from "../utils";

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
        <div className="block lg:hidden w-full z-10 sticky top-[59px]">{nav}</div>
        <div className="lg:w-2/3 order-2 lg:order-1">
          <div className="hidden lg:block z-10 sticky top-[59px]">{nav}</div>
          {children}
        </div>
        <aside
          className={cn("lg:w-1/3 order-1 lg:order-2 self-stretch", nav ? "mt-0" : "mt-16")}
        >
          {sidebar?.map((nestedBlok) => (
            <StoryblokComponent
              blok={nestedBlok}
              key={nestedBlok._uid}
              isSidebar
              {...rest}
            />
          ))}
        </aside>
      </article>
    </Container>
  );
};
