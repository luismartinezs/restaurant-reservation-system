import { render } from "storyblok-rich-text-react-renderer";

import { TextSectionStoryblok } from "@/lib/storyblok/component-types-sb";
import { SectionContainer } from "@/common/components/SectionContainer";
import { SectionTitle } from "@/common/components/SectionTitle";
import { BlokWrapper } from "@/common/components/BlokWrapper";

export const TextSection = ({ blok }: { blok: TextSectionStoryblok }) => {
  return (
    <BlokWrapper blok={blok}>
      <SectionContainer>
        <div className="prose-xl prose-invert">
          {blok.title && <SectionTitle>{blok.title}</SectionTitle>}
          {blok.textContent && <div>{render(blok.textContent)}</div>}
        </div>
      </SectionContainer>
    </BlokWrapper>
  );
};
