'use client'
import Map from "@/components/Map";
import useLibrary from "@/lib/hooks/useLibrary";
import { getAllLibraries } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";
import OLC from "open-location-code-typescript";
import { useEffect } from "react";


export default function Page() {
    const { libraryChanged, allLibraries, setAllLibrary } = useLibrary();

    const { refetch } = useQuery({
        queryKey: ['getAllLibraries'],
        queryFn: () => getAllLibraries().then(r => {
            setAllLibrary(r)
            return r
        }),
        enabled: !!allLibraries,

    })

    useEffect(() => {
        if (libraryChanged) refetch()
    }, [libraryChanged, refetch])

    const markers = allLibraries.map(r => r.location).filter(Boolean)
    const { latitudeCenter, longitudeCenter } = OLC.decode('9F5GF2X3+V2')
    return (
        <div className="container mx-auto py-8">
            <Map
                defaultCenter={[latitudeCenter, longitudeCenter]}
                defaultZoom={15}
                // height={100}
                markers={markers} />
        </div>
    )
}

// https://plus.codes/key?referer=lf21.datashard.work&key=AIzaSyCN3bcmJFkHHpL1qghrswedtKDNDSx880Q