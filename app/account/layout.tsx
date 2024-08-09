import { Container, Group } from "@mantine/core";

import { Navbar } from "@/common/components/Navbar";
import { checkAuth } from "@/features/auth/utils";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();

  return (
    <Container mb={10}>
      <nav aria-label="account" className="border-b border-gray-600 mb-4">
        <Group gap={20} component="ul">
          <Navbar
            links={[
              {
                name: "Account",
                href: "/account",
              },
              {
                name: "Reservations",
                href: "/account/reservations",
              },
            ]}
          />
        </Group>
      </nav>
      {children}
    </Container>
  );
}
