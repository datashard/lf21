"use client";

import useLibrary from "@/lib/hooks/useLibrary";
import { addBookToLibrary } from "@/lib/pb";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
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
  const { library } = useParams<{ library: string }>()
  const { setBookChange } = useLibrary();
  const [title, setTitle] = useState<string>();
  const [author, setAuthor] = useState<string>();
  const [isbn, setISBN] = useState<string>();
  const [open, setOpen] = useState<boolean>(false)
  const [cantype, setCantype] = useState<boolean>(true)

  const handleSubmit = () => {
    if (!user) return;
    validateCSS()
    if ((
      validate("title", title) &&
      validate("author", author) &&
      validate("isbn", isbn)
    )) {
      setCantype(false)
      addBookToLibrary(
        {
          title,
          author,
          isbn,
          creator_clerk_user_id: user.id,
        },
        library
      ).then((res) => {
        setBookChange(res.id);
        setOpen(false)
        setCantype(true)
      });
    } else console.error('Validation did not succeed.')

    setCantype(true)
  };

  const validate = (prop: "title" | "author" | "isbn", value?: string) => {
    const valid = {
      title: z.string({
        message: "This value is required."
      }).min(1),
      author: z.string({
        message: "This value is required."
      }).min(1),
      isbn: z.string({
        message: "This value is required."
      }).min(1)
    }

    return valid[prop].safeParse(value).success
  }



  const addClass = (id: string, attr: string) => {
    document.getElementById(id)?.classList.add(attr)
  }
  const removeClass = (id: string, attr: string) => {
    document.getElementById(id)?.classList.remove(attr)
  }

  const handleEnter = (e: any) => {
    if (e.key == 'Enter') {
      setCantype(false)
      handleSubmit()
      return
    }
    else return
  }

  const validateCSS = useCallback(() => {
    if (!validate("title", title)) addClass("title", "border-rose-500")
    else {
      removeClass("title", "border-rose-500")
      addClass("title", "border-green-500")
    }
    if (!validate("author", author)) addClass("author", "border-rose-500")
    else {
      removeClass("author", "border-rose-500")
      addClass("author", "border-green-500")
    }
    if (!validate("isbn", isbn)) addClass("isbn", "border-rose-500")
    else {
      removeClass("isbn", "border-rose-500")
      addClass("isbn", "border-green-500")
    }
  }, [title, author, isbn, removeClass, addClass])

  useEffect(() => {
    if (open) validateCSS()
  }, [open, title, author, isbn, validateCSS])

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild onClick={() => {
        setTitle(undefined)
        setAuthor(undefined)
        setISBN(undefined)
      }}
      >
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
              onKeyDown={handleEnter}
              disabled={!cantype}
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
              onKeyDown={handleEnter}
              disabled={!cantype}
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
              onKeyDown={handleEnter}
              disabled={!cantype}
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>
        </div>
        {/* <DialogClose asChild> */}
        <Button type="button" onClick={() => handleSubmit()}>
          {
            cantype ? "Save" : (<Loader2 className="animate-spin" />)
          }
        </Button>
      </DialogContent>
    </Dialog>
  );
}
