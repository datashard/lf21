'use client'
import AddLibrary from "@/components/AddLibrary";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser()
  return (
    <>
      <div className="flex flex-1 items-center justify-center rounded-base shadow-sm ">
        <div className="flex flex-col items-center gap-1 p-10 text-center  bg-main dark:bg-white text-text  border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark">
          <h3 className="text-2xl text-primary-foreground font-bold tracking-tight">
            No Library selected
          </h3>
          <p className="text-primary text-muted-foreground">
            You can select one on the left <br />
            {user && `or Add a new one below`}
          </p>
          {user ? (
            <div className="p-4">
              <AddLibrary />
            </div>
          ) : (
            <div className="p-4">
              <Skeleton className="">
                <Button>
                  Add a Library
                </Button>
              </Skeleton>
            </div>
          )}
        </div>
      </div>
    </>
  );
}


