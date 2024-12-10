'use client'
import AddBook from "@/components/AddBook";
import Booklist from "@/components/Booklist";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getLibrary, getLibraryImage } from "@/lib/pb";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import { useParams } from 'next/navigation';

export default function Home() {
    // const { setSelectedLibrary, selectedLibrary, bookChanged, libraryChanged } = useLibrary();
    const { library } = useParams<{ library: string }>()
    const { data: libraryData, isPending } = useQuery({
        queryKey: ['getLibrary', library],
        queryFn: async () => getLibrary(library)
    })
    const { data: image } = useQuery({
        enabled: !!libraryData,
        queryKey: ['getLibraryImage'],
        queryFn: async () => getLibraryImage(libraryData),
    })

    const { user } = useUser();

    return (
        <>
            <div className="relative p-4 my-10 mx-4 rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main dark:bg-mainAccent text-black dark:text-white">
                <div className="absolute right-4">
                    {image && (
                        <Link href={image}>
                            <Button
                                variant="neutral"
                                className="m-2"
                            >
                                View Image
                            </Button>
                        </Link>
                    )}
                    <Link href="/libraries">
                        <Button
                            variant="neutral"
                            className="m-2"
                        >
                            Close
                        </Button>
                    </Link>
                </div>
                <div className="px-2">
                    <h1 className="text-4xl font-bold tracking-tight pt-6">
                        {!isPending ? libraryData?.name : <Skeleton className="h-12 w-40" />}
                    </h1>
                    <span className="text-primary pt-2">
                        {!isPending ? libraryData?.description : <Skeleton className="h-6 w-80 mt-2" />}
                    </span>
                </div>

                <div className="">
                    <Booklist />
                </div>
                {user && (
                    <div className="absolute bottom-0 right-0 p-4 ">
                        <AddBook />
                    </div>
                )}
            </div>
        </>
    );
}
