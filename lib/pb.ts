"use client";

import type { User } from "@clerk/nextjs/server";
import Pocketbase, { RecordModel } from "pocketbase";
// import { getUsernameByID } from "./clerk";

const pb = new Pocketbase("https://wormhole.pockethost.io");
pb.autoCancellation(false);

export interface Library extends RecordModel {
  id: string;
  name: string;
  description: string;
  location: string;
  creator_clerk_user_id: string;
  clerkUser?: User;
  image: string;
}

export interface Book extends RecordModel {
  id: string;
  title: string;
  author: string;
  isbn: string;
  creator_clerk_user_id?: string;
}

export function getUsername(id: string) {
  return fetch(`/api/clerkUser?userId=${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
}

export async function getAllLibraries(): Promise<Library[]> {
  const libraries = await pb.collection("libraries").getFullList({
    sort: "-created",
  });

  return libraries as unknown as Library[];
}

export async function getLibraryImage(library?: Library) {
  if (!library) return;
  return pb.files.getUrl(library, library.image)
}

export async function getLibrary(library: string): Promise<Library> {
  return await pb.collection('libraries').getOne(library) as unknown as Library
}

export async function addLibrary(library: Partial<Library>) {
  return pb
    .collection("libraries")
    .create(library)
    .then((res) => res);
}

export async function addBook(book: Partial<Book>) {
  return pb
    .collection("books")
    .create(book)
    .then((res) => res);
}

export async function addBookToLibrary(book: Partial<Book>, libraryId: string) {
  return addBook(book).then((res) => {
    return pb
      .collection("libraries_books")
      .create({
        book: res.id,
        library: libraryId,
      })
      .then((res) => res);
  });
}

export async function getBooksInLibrary(libraryId: string): Promise<Book[]> {
  const books = await pb.collection("libraries_books").getFullList({
    expand: "book",
    sort: "-created",
  });

  const filtered = books.filter((book) => book.library === libraryId);

  const mapped = filtered.map((book) => {
    return {
      id: book.expand?.book.id,
      author: book.expand?.book.author,
      isbn: book.expand?.book.isbn,
      title: book.expand?.book.title,
      creator_clerk_user_id: book.expand?.book.creator_clerk_user_id
    };
  });
  return mapped as unknown as Book[]
}
export async function removeBookFromLibrary(libraryId: string, bookId: string) {
  const books = await pb.collection("libraries_books").getFullList({
    expand: "book",
    sort: "-created",
  });
  const book = books.find((book) => book.book === bookId);
  if (!book) return;

  return await pb.collection("libraries_books").delete(book.id);
}
