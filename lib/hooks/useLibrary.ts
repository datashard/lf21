import { Library } from "@/lib/pb";
import { create } from "zustand";

type LibraryState = {
  selectedLibrary: Library;
};

type LibraryAction = {
  setSelectedLibrary: (library?: Library) => void;
};

const useLibrary = create<LibraryState & LibraryAction>((set) => ({
  selectedLibrary: undefined as unknown as Library,
  setSelectedLibrary: (library?: Library) => set({ selectedLibrary: library }),
}));

export default useLibrary;
