"use client";

import useLibrary from "@/lib/hooks/useLibrary";
import { getBooksInLibrary, Library } from "@/lib/pb";
import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import AddLibrary from "./AddLibrary";
import { Button } from "./ui/button";
import DataTable from "./ui/data-table";

function NoSelectedLibrary() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-base shadow-sm ">
      <div className="flex flex-col items-center gap-1 p-10 text-center  bg-main dark:bg-white text-text  border-2 border-border dark:border-darkBorder shadow-light dark:shadow-dark">
        <h3 className="text-2xl text-primary-foreground font-bold tracking-tight">
          No Library selected
        </h3>
        <p className="text-primary text-muted-foreground">
          Select one on the left or add a new one.
        </p>
        <div className="p-4">
          <AddLibrary />
        </div>
      </div>
    </div>
  );
}

function YesSelectedLibrary({ selectedLibrary }: { selectedLibrary: Library }) {
  const { setSelectedLibrary } = useLibrary();
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    try {
      getBooksInLibrary(selectedLibrary.id).then((res) => {
        setBooks(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, [selectedLibrary.id]);

  return (
    <div className="relative p-4 my-10 mx-4 rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main dark:bg-mainAccent text-black dark:text-white">
      <Button
        variant="neutral"
        className="absolute right-4 top-4"
        onClick={() => setSelectedLibrary()}
      >
        Close
      </Button>

      <div className="px-2">
        <h1 className="text-4xl font-bold tracking-tight py-6">
          {selectedLibrary.name}
        </h1>
        <p className="text-primary">{selectedLibrary.description}</p>
      </div>

      <div className="">
        <DataTable books={books} />
      </div>
      <div className="absolute bottom-0 right-0 p-4 ">
        <AddBook />
      </div>
    </div>
  );
}
export default function View() {
  const { selectedLibrary } = useLibrary();
  if (selectedLibrary)
    return <YesSelectedLibrary selectedLibrary={selectedLibrary} />;
  else return <NoSelectedLibrary />;
}
