import { TextSectionStoryblok } from "@/lib/storyblok/component-types-sb";
import React from "react";
import { SectionContainer } from "../components/SectionContainer";
import { Title, Text } from "@mantine/core";
import { render } from "storyblok-rich-text-react-renderer";

export const TextSection = ({ blok }: { blok: TextSectionStoryblok }) => {
  return (
    <SectionContainer>
      <div className="prose-xl prose-invert">
        {blok.title && <Title mb={10}>{blok.title}</Title>}
        {blok.textContent && (
          <div>{render(blok.textContent)}</div>
        )}
      </div>
    </SectionContainer>
  );
};
