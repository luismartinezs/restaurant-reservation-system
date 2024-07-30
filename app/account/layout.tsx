import { Navbar } from "@/common/components/Navbar";
import { checkAuth } from "@/features/auth/utils";
import { Group } from "@mantine/core";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await checkAuth();

  return (
    <div>
      <nav aria-label="account">
        <Group ml="xl" gap={20} visibleFrom="sm" component="ul">
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
    </div>
  );
}
