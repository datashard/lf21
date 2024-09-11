"use client";

import { addLibrary } from "@/lib/pb";
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

export default function AddLibrary() {
  const { user } = useUser();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [image, setImage] = useState<string>("");

  const handleSubmit = () => {
    if (!user) return;
    addLibrary({ name, location, description, creator_clerk_user_id: user.id });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="neutral">Add Library</Button>
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
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input id="image" type="file" className="col-span-3" />
          </div> */}
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
