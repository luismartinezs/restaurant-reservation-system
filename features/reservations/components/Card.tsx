import React from "react";
import { Card as MCard, Text, Group, Badge, Button, Flex, Stack } from "@mantine/core";
import Link from "next/link";
import { KEY } from "../constants";
import { Read } from "../types";

export const Card = ({
  item,
  asLink = false,
  deleteButton,
}: {
  item: Read;
  asLink?: boolean;
  deleteButton: React.ReactNode;
}) => {
  const { id, restaurant_id, user_id, start } = item;

  return (
    <MCard shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Badge color="gray" size="sm">ID: {id}</Badge>

        <Group>
          <Text size="sm" fw={500}>Restaurant ID:</Text>
          <Text size="sm">{restaurant_id}</Text>
        </Group>

        <Group>
          <Text size="sm" fw={500}>User ID:</Text>
          <Text size="sm">{user_id}</Text>
        </Group>

        {start && (
          <Group>
            <Text size="sm" fw={500}>Start Time:</Text>
            <Text size="sm">{new Date(start).toLocaleString()}</Text>
          </Group>
        )}
      </Stack>

      <Flex gap="sm" mt="md">
        {asLink && (
          <Button component={Link} href={`/scaffold/${KEY}/${id}`} variant="subtle">
            View
          </Button>
        )}
        <Button component={Link} href={`/scaffold/${KEY}/${id}/edit`} variant="subtle">
          Edit
        </Button>
        {deleteButton}
      </Flex>
    </MCard>
  );
};

export default Card;