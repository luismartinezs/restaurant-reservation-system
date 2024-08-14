import { SocialShareStoryblok } from "@/lib/storyblok/component-types-sb";
import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import { Text } from "@mantine/core";
import { ShareButton } from "../components/ShareButton";

export const SocialShare = ({ blok }: { blok: SocialShareStoryblok }) => {
  const { x, facebook, linkedin } = blok;
  return (
    <div {...storyblokEditable(blok)} className="w-full flex justify-end gap-6 items-center">
      <Text size="lg">Share:</Text>
      {x &&  <ShareButton name="x" />}
      {facebook && <ShareButton name="facebook" />}
      {linkedin && <ShareButton name="linkedin" />}
    </div>
  );
};
