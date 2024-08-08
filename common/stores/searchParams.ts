import { create } from 'zustand'

interface State {
  searchParams: Record<string, string>,
  update: (params: Record<string, string>) => void,
}

export const useSearchParamsStore = create<State>((set) => ({
  searchParams: {},
  update: (params) => set(() => ({
    searchParams: params
  }))
}))