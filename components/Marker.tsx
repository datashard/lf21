import useMap from "@/lib/hooks/useMap"
import { Library } from "@/lib/pb"
import { useRouter } from "next/navigation"
import { Marker as M, } from "pigeon-maps"

interface Mark extends React.ComponentProps<typeof M> {
    library: Library
}

export default function Marker(props: Mark) {
    const { setPoint, setLibrary } = useMap()
    const router = useRouter()
    const onMouseOver = (e: any) => {
        setPoint(e.anchor)
        setLibrary(props.library)
    }
    const onMouseOut = () => {
        setPoint(undefined)
        setLibrary(props.library)
    }
    return (
        <>
            <M
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={() => router.push(`/libraries/${props.library.id}`)}
                {...props}>

            </M>
        </>
    )
}