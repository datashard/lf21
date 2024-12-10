import { Library } from "@/lib/pb";
import { persistNSync as persist } from "persist-and-sync";
import { create } from "zustand";
import { shallow } from 'zustand/shallow';

type LibraryState = {
  selectedLibrary: Library;
  bookChanged: string;
  libraryChanged: string;
  allLibraries: Library[]
};

type LibraryAction = {
  setSelectedLibrary: (library?: Library) => void;
  setBookChange: (a?: any) => void;
  setLibraryChange: (a?: any) => void;
  setAllLibrary: (a?: any) => void;
};

const useLibrary = create<LibraryState & LibraryAction>(
  persist(
    (set, get) => ({
      selectedLibrary: undefined as unknown as Library,
      bookChanged: "",
      libraryChanged: "",
      allLibraries: [],
      setBookChange: (a) => set({ bookChanged: a }),
      setLibraryChange: (a) => set({ libraryChanged: a }),
      setSelectedLibrary: (library?: Library) => set({ selectedLibrary: library }),
      setAllLibrary: (libraries?: Library[]) => {
        if (shallow(get().allLibraries, libraries)) return;
        else set({ allLibraries: libraries })
      }
    }), {
    name: 'libraries',
    storage: "sessionStorage"
  }
  )
)

export default useLibrary;