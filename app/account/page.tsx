import { Account } from "@/features/auth";
import { Container } from "@mantine/core";

export default function AccountPage() {
  return (
    <Container>
      <h1>Your account</h1>
      <Account />
    </Container>
  );
}
