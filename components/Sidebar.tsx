"use client";
import { getAllLibraries, Library } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";
import { LibraryCard } from "./LibraryCard";
import { SkeletonCard } from "./SkeletonCard";

function Skeleton(length: number) {
  return [...Array(length)].map((_, idx) => <SkeletonCard key={idx} />);
}

export default function Sidebar() {
  const { data: libraries, isLoading } = useQuery<Library[]>({
    queryKey: ["libraries"],
    queryFn: getAllLibraries,
  });

  return (
    <div className="flex-1 pl-5 pt-5 overflow-y-auto">
      {!libraries
        ? Skeleton(5)
        : libraries.map((library: Library, idx) => (
            <LibraryCard key={idx} library={library} />
          ))}
    </div>
  );
}
