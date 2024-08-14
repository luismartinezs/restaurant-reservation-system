import { TestStoryblok } from "@/lib/storyblok/component-types-sb";
import { SectionContainer } from "@/common/components/SectionContainer";
import { BlokWrapper } from "@/common/components/BlokWrapper";

export const Test = ({ blok }: { blok: TestStoryblok }) => {
  return (
    <BlokWrapper blok={blok}>
      <SectionContainer>
        Lorem ipsum
      </SectionContainer>
    </BlokWrapper>
  );
};
