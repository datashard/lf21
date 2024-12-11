import { create } from "zustand";
import { Library } from "../pb";

type LibraryState = {
    point: [number, number] | undefined;
    library?: Library
};

type LibraryAction = {
    setPoint: (point?: [number, number]) => void;
    setLibrary: (l: Library) => void
};

const useMap = create<LibraryState & LibraryAction>(
    (set) => ({
        point: undefined,
        setPoint: (point) => set({ point: point }),
        setLibrary: (l) => set({ library: l })
    })
)

export default useMap;