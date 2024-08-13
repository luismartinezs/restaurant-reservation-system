import { Container } from "@mantine/core";
import React from "react";
import { cn } from "../utils";

export const SectionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Container>
      <div className={cn("my-16", className)}>{children}</div>
    </Container>
  );
};
