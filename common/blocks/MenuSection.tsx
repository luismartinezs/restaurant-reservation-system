import { MenuSectionStoryblok } from "@/lib/storyblok/component-types-sb";
import { List, Text, Title } from "@mantine/core";
import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";
import { MenuItem } from "./MenuItem";

export const MenuSection = ({ blok }: { blok: MenuSectionStoryblok }) => {
  return (
    <div {...storyblokEditable(blok)} className="flex flex-col gap-6 border-t border-gray-700 py-6">
      <Title order={3} fw={500} size={18}>
        {blok.title}
      </Title>
      <Text size="sm" fw={600}>{blok.subtitle}</Text>
      <List
        spacing="lg"
        className="columns-2 gap-20"
        classNames={{
          itemWrapper: "w-full",
          itemLabel: "w-full text-sm",
        }}
      >
        {blok.items?.map((item) => {
          return <MenuItem blok={item} key={item._uid} />;
        })}
      </List>
    </div>
  );
};
