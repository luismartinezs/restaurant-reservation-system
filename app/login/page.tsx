import { LoginForm } from "@/features/auth/server";
import { Container, Title } from "@mantine/core";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <Container size="xs">
      <Title order={1} mb="md">
        Login
      </Title>
      <LoginForm searchParams={searchParams} />
    </Container>
  );
}
