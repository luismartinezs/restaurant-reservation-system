import { Container } from "@mantine/core";
import { LayoutProps } from "./types";

export const SimplePage = ({ children, nav }: LayoutProps) => {
  return (
    <Container size="lg">
      <article className="">
        <div className="w-full z-10 sticky top-[59px]">{nav}</div>
        {children}
      </article>
    </Container>
  );
};
