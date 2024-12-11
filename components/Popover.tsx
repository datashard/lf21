import useMap from "@/lib/hooks/useMap";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "./ui/card";

export default function Popover() {
    const { library } = useMap()
    if (!library) return;

    return (
        <Link href={`/libraries/${library.id}`}>
            <Card
                className="mt-4 rounded-xl rounded-tl-none"
            >
                <CardHeader>
                    <CardTitle>{library.name}</CardTitle>
                    <CardDescription>{library.location}</CardDescription>
                </CardHeader>
                <CardContent>{library.description}</CardContent>
            </Card>
        </Link>
    );
}
