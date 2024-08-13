import { MenuStoryblok } from "@/lib/storyblok/component-types-sb";
import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import { MenuSection } from "./MenuSection";
import { SectionTitle } from "../components/SectionTitle";
import { SectionContainer } from "../components/SectionContainer";
import { MenuToggle } from "../components/MenuToggle";

export const Menu = ({ blok }: { blok: MenuStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)}>
      <SectionContainer>
        <MenuToggle>
          <SectionTitle mb={16}>Menu</SectionTitle>
          {blok.sections?.map((section) => {
            return <MenuSection blok={section} key={section._uid} />;
          })}
        </MenuToggle>
      </SectionContainer>
    </div>
  );
};
