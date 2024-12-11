"use client";
import useLibrary from "@/lib/hooks/useLibrary";
import { getAllLibraries } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { LibraryCard } from "./LibraryCard";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./utils/Skeleton";



export default function Sidebar() {
  const { libraryChanged, allLibraries, setAllLibrary } = useLibrary();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['getAllLibraries'],
    queryFn: () => getAllLibraries().then(r => {
      setAllLibrary(r)
      return r
    }),
    enabled: !!allLibraries,

  })

  useEffect(() => {
    if (libraryChanged) refetch()
  }, [libraryChanged, refetch])

  return (
    <div className="flex-1 px-2 mt-6">
      <ScrollArea className="h-[85vh]!">
        <div className="m-2">
          {isLoading
            ? Skeleton(5)
            : data?.map((lib, idx) => (
              <LibraryCard key={idx} library={lib} />
            ))
          }
        </div>
      </ScrollArea>
    </div>
  );
}
