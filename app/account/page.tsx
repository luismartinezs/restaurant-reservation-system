import { Account } from "@/features/auth";
import { Container, Title } from "@mantine/core";

export default function AccountPage() {
  return (
    <Container>
      <Title order={1} mb={8}>Your account</Title>
      <Account />
    </Container>
  );
}
