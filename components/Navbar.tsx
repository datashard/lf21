import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-8 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Free Little Libraries
        </Link>
        <nav className="flex items-center space-x-4">
          <div>
            <Link href="/libraries" className="text-2xl font-bold">
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>Libraries</span>
              </Button>
            </Link>
          </div>
          <div>
            {" "}
            <SignedIn>
              <div className="flex items-center space-x-2">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignUpButton>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
}
