"use client";

import { Library } from "@/lib/pb";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card";

export function LibraryCard({ library }: { library: Library }) {
  return (
    <Link href={`/libraries/${library.id}`}>
      <Card
        style={{ cursor: "pointer" }}
        className="mt-4"
      >
        <CardHeader>
          <CardTitle>{library.name}</CardTitle>
          <CardDescription>{library.location}</CardDescription>
        </CardHeader>
        <CardContent>{library.description}</CardContent>
      </Card>
    </Link>
  );
}
