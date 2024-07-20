import { Box } from "@mantine/core";

import { BearCounter, Controls } from "./bears";

export default async function Dev() {
  return (
    <Box
      style={{
        color: "white",
        fontSize: "1.5rem",
      }}
    >
      Mantine works
      Zustand works
      <BearCounter />
      <Controls />
    </Box>
  );
}
