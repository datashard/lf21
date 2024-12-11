// "use client";

// import useLibrary from "@/lib/hooks/useLibrary";
// import { Library } from "@/lib/pb";
// import { useUser } from "@clerk/nextjs";
// import AddBook from "./AddBook";
// import AddLibrary from "./AddLibrary";
// import Booklist from "./Booklist";
// import { Button } from "./ui/button";

// function YesSelectedLibrary({ library }: { library: Library }) {
//   const { setSelectedLibrary, selectedLibrary, bookChanged, libraryChanged } = useLibrary();
//   const { user } = useUser();

//   return (
//     <div className="relative p-4 my-10 mx-4 rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main dark:bg-mainAccent text-black dark:text-white">
//       <Button
//         variant="neutral"
//         className="absolute right-4 top-4"
//         onClick={() => setSelectedLibrary()}
//       >
//         Close
//       </Button>

//       <div className="px-2">
//         <h1 className="text-4xl font-bold tracking-tight py-6">
//           {selectedLibrary.name}
//         </h1>
//         <p className="text-primary">{selectedLibrary.description}</p>
//       </div>

//       <div className="">
//         <Booklist />
//       </div>
//       {user && (
//         <div className="absolute bottom-0 right-0 p-4 ">
//           <AddBook />
//         </div>
//       )}
//     </div>
//   );
// }
// export default function View() {
//   const { selectedLibrary } = useLibrary();
//   if (selectedLibrary)
//     return <YesSelectedLibrary library={selectedLibrary} />;
//   else return <NoSelectedLibrary />;
// }
