"use client";

import { addBook } from "@/lib/pb";
import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AddBook() {
  const { user } = useUser();
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isbn, setISBN] = useState<string>("");
  // const [image, setImage] = useState<string>("");

  const handleSubmit = () => {
    if (!user) return;
    const book = addBook({
      name: title,
      location: author,
      description: isbn,
      creator_clerk_user_id: user.id,
    });

    // TODO: Add Book to Library

    console.log(book);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="neutral">Add Book</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Book</DialogTitle>
          <DialogDescription>
            with this form you can add a new library to our list.
            <br />
            We use <Link href="#">Plus Codes</Link> for the Locations
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Europa"
              className="col-span-3"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="author" className="text-right">
              Author
            </Label>
            <Input
              id="author"
              placeholder="Elias J. Hurst"
              className="col-span-3"
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="isbn" className="text-right">
              ISBN
            </Label>
            <Input
              id="isbn"
              placeholder="1449327486"
              className="col-span-3"
              required
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>
        </div>
        <DialogClose asChild>
          <Button type="button" onClick={() => handleSubmit()}>
            Save changes
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
