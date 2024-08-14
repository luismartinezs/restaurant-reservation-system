import { Container } from "@mantine/core";
import React, { ReactNode } from "react";

export const SimplePage = ({ children }: { children: ReactNode }) => {
  return (
    <Container size="lg">
      <article>
        {children}
      </article>
    </Container>
  );
};
