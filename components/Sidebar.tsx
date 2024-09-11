"use client";
import useLibrary from "@/lib/hooks/useLibrary";
import { getAllLibraries, Library } from "@/lib/pb";
import { useEffect, useState } from "react";
import { LibraryCard } from "./LibraryCard";
import { SkeletonCard } from "./SkeletonCard";
import { ScrollArea } from "./ui/scroll-area";

function Skeleton(length: number) {
  return [...Array(length)].map((_, idx) => <SkeletonCard key={idx} />);
}

export default function Sidebar() {
  const { libraryChanged } = useLibrary();
  const [libraries, setLibraries] = useState<Library[]>();

  useEffect(() => {
    try {
      getAllLibraries().then((res) => {
        setLibraries(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [libraryChanged]);

  return (
    <div className="flex-1 px-2 mt-5 ">
      <ScrollArea className="h-[85vh] m-2">
        <div className="mx-2">
          {!libraries
            ? Skeleton(5)
            : libraries.map((library: Library, idx) => (
                <LibraryCard key={idx} library={library} />
              ))}
        </div>
      </ScrollArea>
    </div>
  );
}
