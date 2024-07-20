import { Box, Pill } from "@mantine/core";

import { Counter, Controls } from "./count";

export default async function Dev() {
  return (
    <>
      <Box
        // style={{
        //   color: "yellow",
        //   fontSize: "1.5rem",
        // }}
      >
        Mantine works Zustand works
        <Counter />
        <Controls />
        <Pill color="teal">Hello, Mantine!</Pill>
      </Box>
      <Pill color="teal">Hello, Mantine!</Pill>
    </>
  );
}
