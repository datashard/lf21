import { Library } from "@/lib/pb";
import { create } from "zustand";

type LibraryState = {
  selectedLibrary: Library;
  bookChanged: string;
  libraryChanged: string;
};

type LibraryAction = {
  setSelectedLibrary: (library?: Library) => void;
  setBookChange: (a?: any) => void;
  setLibraryChange: (a?: any) => void;
};

const useLibrary = create<LibraryState & LibraryAction>((set) => ({
  selectedLibrary: undefined as unknown as Library,
  bookChanged: "",
  libraryChanged: "",
  setBookChange: (a) => set({ bookChanged: a }),
  setLibraryChange: (a) => set({ libraryChanged: a }),
  setSelectedLibrary: (library?: Library) => set({ selectedLibrary: library }),
}));

export default useLibrary;
