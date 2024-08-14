import { Title, TitleProps } from "@mantine/core";
import React, { ReactNode } from "react";

export const SectionTitle = ({
  children,
  ...titleProps
}: {
  children: ReactNode;
} & Omit<TitleProps, "order">) => {
  return (
    <Title order={2} mb={10} {...titleProps}>
      {children}
    </Title>
  );
};
