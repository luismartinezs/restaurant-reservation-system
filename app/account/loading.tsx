import { Container, Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <Container>
      <Skeleton w="100%" h={30} />
    </Container>
  );
}