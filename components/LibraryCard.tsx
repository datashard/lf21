"use client";

import useLibrary from "@/lib/hooks/useLibrary";
import { getUsername, Library } from "@/lib/pb";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function LibraryCard({ library }: { library: Library }) {
  const [username, setUsername] = useState<string | undefined>();
  const setSelectedLibrary = useLibrary((state) => state.setSelectedLibrary);

  useEffect(() => {
    getUsername(library.creator_clerk_user_id).then((res) => {
      setUsername(res.username);
    });
  }, [library.creator_clerk_user_id]);

  return (
    <Card
      onClick={() => {
        setSelectedLibrary(library);
      }}
      style={{ cursor: "pointer" }}
      className="mt-4"
    >
      <CardHeader>
        <CardTitle>{library.name}</CardTitle>
        <CardDescription>{library.location}</CardDescription>
      </CardHeader>
      <CardContent>{library.description}</CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        Added by &nbsp;
        {username ? (
          <Badge variant={"neutral"}>{username}</Badge>
        ) : (
          <Skeleton className="h-4 w-1/2" />
        )}
      </CardFooter>
    </Card>
  );
}
