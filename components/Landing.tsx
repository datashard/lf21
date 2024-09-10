"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, Map, MapPin, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen  ">
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4   ">
            Discover Little Free Libraries Near You
          </h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Join our community of book lovers and share the joy of reading!
          </p>
          <div className="flex justify-center space-x-4">
            <Input placeholder="Enter your location" className="max-w-xs" />
            <Button variant={"default"}>Find Libraries</Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
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
                title: "Map Little Libraries",
                icon: <Map className="w-12 h-12 mb-4 text-primary" />,
              },
              {
                title: "Promote Reading",
                icon: <Book className="w-12 h-12 mb-4 text-primary" />,
              },
              {
                title: "Build Community",
                icon: <Users className="w-12 h-12 mb-4 text-primary" />,
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex flex-col items-center">
                    {item.icon}
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn how our project helps to {item.title.toLowerCase()} in
                    our local area.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Find a Little Library Near You
          </h2>
          <div className="rounded-base shadow-light dark:shadow-dark border-2 border-border dark:border-darkBorder bg-main dark:bg-mainAccent text-black dark:text-white aspect-video flex items-center justify-center rounded-base overflow-hidden relative group">
            <MapPin className="w-16 h-16 text-accent-foreground absolute transition-all duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-xl font-semibold">
                Interactive Map Coming Soon!
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background text-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-6 text-lg">
            Join us in spreading the joy of reading!
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Learn More About Our Project
          </Button>
        </div>
      </footer>
    </div>
  );
}
