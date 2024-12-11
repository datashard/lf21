import { SkeletonCard } from "../SkeletonCard";

export function Skeleton(length: number) {
    return [...Array(length)].map((_, idx) => <SkeletonCard key={idx} />);
}