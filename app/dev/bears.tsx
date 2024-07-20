"use client"

import { useBearsStore } from "@/stores/bears"

export function BearCounter() {
  const bears = useBearsStore((state) => state.bears)
  return <h1>{bears} around here...</h1>
}

export function Controls() {
  const increasePopulation = useBearsStore((state) => state.increasePopulation)
  return <button onClick={increasePopulation}>one up</button>
}