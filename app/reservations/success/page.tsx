import { Button, Card, Container, Group, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Success() {
  return (
    <Container>
      <Card>
        <Stack justify="space-between" mt="md" mb="xs">
          <Title order={1}>Reservation successful!</Title>
          <Button component={Link} href="/account/reservations">
            See your reservations
          </Button>
        </Stack>
      </Card>
    </Container>
  );
}
