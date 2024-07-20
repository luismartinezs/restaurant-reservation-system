import { create } from 'zustand'

type State = {
  count: number
  increaseCount: () => void
}

export const useStore = create<State>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
}))