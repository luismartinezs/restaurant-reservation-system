"use client";

import { ActionIcon, Box, Container, Drawer } from "@mantine/core";
import { ReactNode, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { CiFilter } from "react-icons/ci";

export function FiltersMenu({ filters }: { filters: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = () => setOpened((o) => !o);

  const content = (
    <Box component="form" w="100%" py={8}>
      <div className="flex flex-col gap-4">{filters}</div>
    </Box>
  );

  if (isMobile) {
    return (
      <div>
        <ActionIcon
          variant="subtle"
          onClick={toggleDrawer}
          aria-label="Toggle filters"
        >
          <CiFilter />
        </ActionIcon>
        <Drawer
          opened={opened}
          onClose={toggleDrawer}
          title="Filters"
          padding="xl"
          size="100%"
        >
          {content}
        </Drawer>
      </div>
    );
  }

  return (
    <Container
      size="50rem"
      mx={0}
      className="min-w-[200px]"
      bd="1px solid gray.8"
      h="fit-content"
    >
      {content}
    </Container>
  );
}
