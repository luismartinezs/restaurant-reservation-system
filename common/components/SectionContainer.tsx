// import { Container } from "@mantine/core";
import React from "react";
import { cn } from "../utils";

export const SectionContainer = ({
  children,
  className,
  isSidebar,
}: {
  children: React.ReactNode;
  className?: string;
  isSidebar?: boolean;
}) => {
  return (
    // <Container>
    <div className={cn(isSidebar ? "my-8 md:my-5" : "my-8", className)}>
      {children}
    </div>
    // </Container>
  );
};
