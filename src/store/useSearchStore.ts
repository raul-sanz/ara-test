import { create } from 'zustand'

interface Store {
  search: string;
  setSearch: (value: string) => void;
  items: any[]
  setItems: (value: [any]) => void,
  focus: boolean,
  setFocus: (value: boolean) => void
}

const useSearchStore = create<Store>((set) => ({
  search: '',
  setSearch: (value: string) => set({ search: value }),
  items: [],
  setItems: (value: [any]) => set({ items: value }),
  focus: false,
  setFocus: (value: boolean) => set({ focus: value })
}));

export default useSearchStore;