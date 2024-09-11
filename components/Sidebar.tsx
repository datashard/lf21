"use client";
import { getAllLibraries, Library } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";
import { LibraryCard } from "./LibraryCard";
import { SkeletonCard } from "./SkeletonCard";
import { ScrollArea } from "./ui/scroll-area";

function Skeleton(length: number) {
  return [...Array(length)].map((_, idx) => <SkeletonCard key={idx} />);
}

export default function Sidebar() {
  // TODO: try and refresh when new library is added

  const { data: libraries } = useQuery<Library[]>({
    queryKey: ["libraries/getAll/Sidebar"],
    queryFn: getAllLibraries,
  });

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
