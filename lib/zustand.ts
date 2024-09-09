import { create } from "zustand";
import { Library } from "./pb";

type State = {
  selectedLibrary: Library;
};

type Action = {
  setSelectedLibrary: (library: Library) => void;
};

const useLibrary = create<State & Action>((set) => ({
  selectedLibrary: {} as Library,
  setSelectedLibrary: (library: Library) => set({ selectedLibrary: library }),
}));

export default useLibrary;
