import { TextSectionStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { SectionContainer } from "../components/SectionContainer";
import { render } from "storyblok-rich-text-react-renderer";
import { SectionTitle } from "../components/SectionTitle";

export const TextSection = ({ blok }: { blok: TextSectionStoryblok }) => {
  return (
    <SectionContainer>
      <div className="prose-xl prose-invert">
        {blok.title && <SectionTitle>{blok.title}</SectionTitle>}
        {blok.textContent && (
          <div>{render(blok.textContent)}</div>
        )}
      </div>
    </SectionContainer>
  );
};
