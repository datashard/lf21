'use client'
import useLibrary from "@/lib/hooks/useLibrary"
import useMap from "@/lib/hooks/useMap"
import { useTheme } from "next-themes"
import Link from "next/link"
import OLC from 'open-location-code-typescript'
import { Overlay, Map as PMap, ZoomControl } from "pigeon-maps"
import { useState } from "react"
import Marker from "./Marker"
// @ts-expect-error Doesn't have types but works
import Cluster from 'pigeon-cluster'
import Popover from "./Popover"

const MAPTILER_ACCESS_TOKEN = 'gbF1QiFvLquk2bJyKtuR'


export default function Map(props: {
    height?: number
    defaultCenter: [number, number]
    defaultZoom: number,
    markers: string[]
}) {
    const [center, setCenter] = useState<[number, number]>(props.defaultCenter)
    const [zoom, setZoom] = useState(props.defaultZoom)
    const { theme } = useTheme()
    const { allLibraries } = useLibrary()
    const { point } = useMap()
    const MAP_ID = `streets-v2${theme === 'dark' ? '-dark' : ''}`
    function mapTiler(x: any, y: any, z: any, dpr: any) {
        return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png?key=${MAPTILER_ACCESS_TOKEN}`
    }


    return (
        <div className="rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main dark:bg-mainAccent text-black dark:text-white aspect-video flex items-center justify-center rounded-base overflow-hidden relative group">
            <PMap
                provider={mapTiler}
                dprs={[1, 2]}
                height={props.height}
                defaultCenter={center}
                defaultZoom={zoom}

                attribution={<Link href={'https://maptiler.com'}>Maptiler</Link>}
                onBoundsChanged={({ center, zoom }) => {
                    setCenter(center)
                    setZoom(zoom)
                }} >
                <ZoomControl />
                <Cluster>
                    {props.markers.map((marker, idx) => {
                        if (marker === undefined) return;
                        else {
                            const library = allLibraries.filter(l => marker === l.location)[0]
                            const { latitudeCenter, longitudeCenter } = OLC.decode(marker)
                            return <Marker color="#bd52eb" library={library} key={idx} width={30} anchor={[latitudeCenter, longitudeCenter]} />
                        }

                    })}
                </Cluster>
                <Overlay anchor={point} offset={[-5, 20]}>
                    {point && <Popover />}
                </Overlay>
            </PMap>
        </div>
    )
}