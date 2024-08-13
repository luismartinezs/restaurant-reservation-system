import { MenuItemStoryblok } from "@/lib/storyblok/component-types-sb";
import { ListItem, Text } from "@mantine/core";
import { storyblokEditable } from "@storyblok/react/rsc";
import React from "react";

export const MenuItem = ({ blok }: { blok: MenuItemStoryblok }) => {
  const { name, price, description } = blok;
  return (
    <ListItem {...storyblokEditable(blok)}>
      <div className="flex justify-between w-full gap-2">
        <Text fw={600} size="sm">{name}</Text>
        <Text fw={600} size="sm">{price}</Text>
      </div>
      <Text fw={400} size="sm" mt={8} c="gray.5">{description}</Text>
    </ListItem>
  );
};
