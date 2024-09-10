"use client";
import { ThemeSwitcher } from "@/components/ThemeToggle";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <nav className="left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border dark:border-darkNavBorder bg-white dark:bg-secondaryBlack px-5 m500:h-16 ">
      <div className="mx-auto flex w-[1300px] dark:text-darkText text-text max-w-full items-center justify-between">
        <div className="flex items-center gap-10">
          <Link
            className="text-2xl w-[172px] m900:w-[unset] font-heading m500:text-xl"
            href={"/"}
          >
            LITTLE FREE LIBRARY
          </Link>
        </div>

        <div className="flex items-center gap-10 m900:hidden">
          <Link className="text-xl font-base" href="/libraries">
            Libraries
          </Link>
        </div>

        <div className="flex w-[172px] items-center justify-end gap-5 m800:w-[unset] m400:gap-3">
          <ThemeSwitcher />
          <div>
            <SignedIn>
              <div className="flex items-center space-x-2">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignUpButton>
                <Button
                  variant="noShadow"
                  className="flex items-center space-x-2"
                >
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

// export default function Navbar() {
//   return (
//     <header className="py-4 bg-background/80 backdrop-blur-md sticky top-0 z-50">
//       <div className="container mx-8 flex justify-between items-center">
//         <Link href="/" className="text-2xl font-bold">
//           Free Little Libraries
//         </Link>
//         <nav className="flex items-center space-x-4">
//           <div>
//             <Link href="/libraries" className="text-2xl font-bold">
//               <Button variant="ghost" className="flex items-center space-x-2">
//                 <span>Libraries</span>
//               </Button>
//             </Link>
//           </div>
//           <div>
//             {" "}
//             <SignedIn>
//               <div className="flex items-center space-x-2">
//                 <UserButton />
//               </div>
//             </SignedIn>
//             <SignedOut>
//               <SignUpButton>
//                 <Button variant="ghost" className="flex items-center space-x-2">
//                   <span>Sign Up</span>
//                 </Button>
//               </SignUpButton>
//             </SignedOut>
//           </div>
//         </nav>
//       </div>
//     </header>
//   );
// }
