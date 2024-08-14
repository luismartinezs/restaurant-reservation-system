import { Container } from "@mantine/core";
import { LayoutProps } from "./types";

export const SimplePage = ({ children, nav }: LayoutProps) => {
  return (
    <Container size="lg">
      <article className="">
        {nav}
        {children}
      </article>
    </Container>
  );
};
