import { LoginForm } from "@/features/auth/server";
import { Container, Title } from "@mantine/core";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; redirect: string };
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
