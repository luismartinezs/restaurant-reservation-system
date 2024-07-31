"use client";

import { AppShell, Burger, Flex, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function CollapseDesktop({
  navbar,
  children,
}: {
  navbar: React.ReactNode;
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();

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
            <div>Logo</div>
            <Group ml="xl" gap={20} visibleFrom="sm" component="ul">
              {navbar}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Flex component="ul" direction="column" gap={12}>
          {navbar}
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer h={60} p="md" style={{ marginTop: "2rem" }}>
        <Text size="sm" className="text-center">
          © 2024 RicoRico. All rights reserved.
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
}
