"use client";

import { Skeleton } from "./ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-1.5 mt-4 rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main text-black">
      <div className="flex flex-col space-y-1.5">
        <div className="p-4">
          {/* Header */}
          <div className="space-y-1.5">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          {/* Content */}
          <div className="space-y-4 pt-4">
            <Skeleton className="h-8 w-4/6" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    </div>
  );
}
