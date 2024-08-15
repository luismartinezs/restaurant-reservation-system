"use client";

import NextLink from "next/link";

import { Anchor, AppShell, Burger, Flex, Group, Text } from "@mantine/core";
import { useDisclosure, useEventListener } from "@mantine/hooks";
import { CloudinaryImage } from "./CloudinaryImage";
import { FaGithub } from "react-icons/fa";

export function CollapseDesktop({
  navbar,
  children,
}: {
  navbar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const ref = useEventListener("click", toggle);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 500,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="lg">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Anchor component={NextLink} href="/" underline="never" c="white">
              <Group gap={4}>
                <CloudinaryImage
                  folderPath="assets"
                  imgId="logo_sy2afn"
                  alt="A logo looking like a burger"
                  width={50}
                  height={50}
                />
                <Text size="xl" fw={700}>
                  RicoRico
                </Text>
              </Group>
            </Anchor>
            <Group ml="xl" gap={20} visibleFrom="sm" component="ul">
              {navbar}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {/* conditionally render to prevent keyboard focus on desktop */}
        {opened ? (
          <Flex component="ul" direction="column" gap={12} ref={ref}>
            {navbar}
          </Flex>
        ) : null}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer h={60} p="md" style={{ marginTop: "2rem" }}>
        <div className="flex gap-2 justify-center">
          <Text size="sm" className="text-center">
            © 2024 RicoRico. All rights reserved.
          </Text>
          <a
            href="https://github.com/luismartinezs/restaurant-reservation-system"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">View on Github</span>
            <FaGithub size={20} />
          </a>
        </div>
      </AppShell.Footer>
    </AppShell>
  );
}
