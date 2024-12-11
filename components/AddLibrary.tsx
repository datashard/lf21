"use client";

import useLibrary from "@/lib/hooks/useLibrary";
import { addLibrary } from "@/lib/pb";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
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

export default function AddLibrary() {
  const { user } = useUser();
  const { setLibraryChange } = useLibrary();
  const [name, setName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [open, setOpen] = useState<boolean>(false)
  const [cantype, setCantype] = useState<boolean>(true)

  const handleSubmit = () => {
    if (!user) return;
    validateCSS()
    if ((
      validate("name", name) &&
      validate("description", description) &&
      validate("location", location)
    )) {
      setCantype(false)
      addLibrary({
        name,
        location,
        description,
        creator_clerk_user_id: user.id,
      }).then((res) => {
        setLibraryChange(res.id);
        setOpen(false)
        setCantype(true)
      });
    } else console.error('Validation did not succeed.')

    setCantype(true)
  };

  const validate = (prop: "name" | "location" | "description", value?: string) => {
    const valid = {
      name: z.string({
        message: "This value is required."
      }).min(1),
      location: z.string({
        message: "This value is required."
      }).min(1),
      description: z.string({
        message: "This value is required."
      }).min(1)
    }

    return valid[prop].safeParse(value).success
  }

  const validateCSS = () => {
    if (!validate("name", name)) {
      addClass("name", "border-rose-500")
      addClass("name", "dark:border-rose-500")
    }
    else {
      removeClass("name", "border-rose-500")
      addClass("name", "border-green-500")
      removeClass("name", "dark:border-rose-500")
      addClass("name", "dark:border-green-500")
    }
    if (!validate("location", location)) {
      addClass("location", "border-rose-500")
      addClass("location", "dark:border-rose-500")
    }
    else {
      removeClass("location", "border-rose-500")
      addClass("location", "border-green-500")
      removeClass("location", "dark:border-rose-500")
      addClass("location", "dark:border-green-500")
    }
    if (!validate("description", description)) {
      addClass("location", "border-rose-500")
      addClass("location", "dark:border-rose-500")
    }
    else {
      removeClass("description", "border-rose-500")
      addClass("description", "border-green-500")
      removeClass("description", "dark:border-rose-500")
      addClass("description", "dark:border-green-500")
    }
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

  useEffect(() => {
    if (open) validateCSS()
  }, [open, name, description, location, validateCSS])

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild onClick={() => {
        setName(undefined)
        setLocation(undefined)
        setDescription(undefined)
      }}
      >
        <Button variant="neutral">Add a Library</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add new Library</DialogTitle>
          <DialogDescription>
            with this form you can add a new library to our list.
            <br />
            We use <Link href="#">Plus Codes</Link> for the Locations
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Example Library name"
              className="col-span-3"
              required
              disabled={!cantype}
              onKeyDown={handleEnter}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              placeholder="9F5GF2X2+VX"
              className="col-span-3"
              required
              disabled={!cantype}
              onKeyDown={handleEnter}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Example Library Description"
              className="col-span-3"
              required
              disabled={!cantype}
              onKeyDown={handleEnter}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {/* <DialogClose> */}
        <Button type="button" onClick={() => handleSubmit()}>
          Save changes
        </Button>
        {/* </DialogClose> */}
      </DialogContent>
    </Dialog>
  );
}
