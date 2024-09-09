"use client";

import type { User } from "@clerk/nextjs/server";
import axios from "axios";
import Pocketbase, { RecordModel } from "pocketbase";
// import { getUsernameByID } from "./clerk";

const pb = new Pocketbase("https://wormhole.pockethost.io");
export type Library = {
  id: string;
  name: string;
  description: string;
  location: string;
  creator_clerk_user_id: string;
  clerkUser?: User;
  image: string;
} & RecordModel;

export function getUsername(id: string) {
  return axios.get(`/api/clerkUser?userId=${id}`).then((res) => res.data);
}

export async function getAllLibraries(): Promise<Library[]> {
  const libraries = await pb.collection("libraries").getFullList({
    sort: "-created",
  });

  return libraries as unknown as Library[];
}

export async function getBooksInLibrary(libraryId: string) {
  const books = await pb.collection("books").getFullList({
    where: {
      library: libraryId,
    },
    sort: "-created",
  });
  return books;
}
