"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useLibrary from "@/lib/hooks/useLibrary";
import { getAllLibraries } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";
import { Book, Map as MapIcon, Users } from "lucide-react";
import Link from "next/link";
import OLC from "open-location-code-typescript";
import { useEffect } from "react";
import Map from "./Map";

export default function LandingPage() {
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
    <div className="min-h-screen">
      <section className="py-20">
        <div className="container mx-auto pt-4 text-center">
          <h2 className="text-5xl font-bold mb-4   ">
            Discover Little Free Libraries Near You
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Join our community of book lovers and share the joy of reading!
          </p>
        </div>
      </section>

      <main className="container mx-auto pb-4 pb-12">
        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            What are Little Free Libraries?
          </h2>
          <p className="text-lg text-center max-w-2xl mx-auto text-muted-foreground">
            Little Free Libraries are small, community-run book exchanges that
            promote literacy and the love of reading. They operate on a "take a
            book, leave a book" principle, fostering a sense of community and
            sharing.
          </p>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Our Project
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Maps Little Libraries",
                icon: <MapIcon className="w-12 h-12 mb-4 text-primary" />,
                content: 'Little Libraries are hard to find, we make it easy.'
              },
              {
                title: "Promotes Reading",
                icon: <Book className="w-12 h-12 mb-4 text-primary" />,
                content: 'Little Libraries give everyone access to Books they might be interested in.'
              },
              {
                title: "Builds Community",
                icon: <Users className="w-12 h-12 mb-4 text-primary" />,
                content: 'Sharing books with your local Community helps building it up.'
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300 pb-5"
              >
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    {item.icon}
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-base! font-semibold">
                    {item.content}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className=" mx-40">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Find a Little Library Near You
          </h2>
          <Map
            defaultCenter={[latitudeCenter, longitudeCenter]}

            defaultZoom={15}
            markers={markers} />
        </section>
      </main>

      <footer className="bg-background text-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-6 text-lg">
            Join us in spreading the joy of reading!
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href={'/map'}>Explore a bigger Map.</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
