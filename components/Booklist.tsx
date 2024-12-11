import useLibrary from "@/lib/hooks/useLibrary";
import { getBooksInLibrary } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import DataTable from "./ui/data-table";

export default function Booklist() {
    const { library } = useParams<{ library: string }>()
    const { bookChanged } = useLibrary()

    // const { selectedLibrary } = useLibrary()
    const { data: books, refetch } = useQuery({
        queryKey: ['getBooksInLibrary', library],
        queryFn: async () => getBooksInLibrary(library)
    })

    useEffect(() => {
        refetch()
    }, [bookChanged, refetch])

    return (
        <DataTable books={books} />
    );
}
