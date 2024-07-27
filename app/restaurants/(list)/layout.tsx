import { FiltersMenu } from "@/features/filters";
import { Flex } from "@mantine/core";

export default function ListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex justify="center">
      <FiltersMenu />
      <div>{children}</div>
    </Flex>
  );
}
