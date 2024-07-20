"use client";

import { Button, Pill } from "@mantine/core";

import { useStore } from "@/stores";

export function Counter() {
  const count = useStore((state) => state.count);

  return <Pill>{count}</Pill>;
}

export function Controls() {
  const increaseCount = useStore((state) => state.increaseCount);

  return <Button onClick={increaseCount} variant="default">one up</Button>;
}
