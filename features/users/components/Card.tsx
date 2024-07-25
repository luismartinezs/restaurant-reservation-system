import React from "react";
import {
  Card as MCard,
  Text,
  Group,
  Badge,
  Button,
  Flex,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { KEY } from "../constants";
import { User } from "@supabase/supabase-js";

export const Card = ({
  item,
  asLink = false,
  deleteButton,
}: {
  item: User;
  asLink?: boolean;
  deleteButton: React.ReactNode;
}) => {
  const { id, email } = item;

  return (
    <MCard shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Badge color="gray" size="sm">
          ID: {id}
        </Badge>

        {email && (
          <Group>
            <Text size="sm" fw={500}>
              Email:
            </Text>
            <Text size="sm">{email}</Text>
          </Group>
        )}
      </Stack>

      <Flex gap="sm" mt="md">
        {asLink && (
          <Button
            component={Link}
            href={`/scaffold/${KEY}/${id}`}
            variant="subtle"
          >
            View
          </Button>
        )}
        <Button
          component={Link}
          href={`/scaffold/${KEY}/${id}/edit`}
          variant="subtle"
        >
          Edit
        </Button>
        {deleteButton}
      </Flex>
    </MCard>
  );
};

export default Card;
