import Navbar from "@/components/Navbar";
import QueryClientProvider from "@/lib/providers/query";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Free Library",
  description: "Little Free Library Listings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <ClerkProvider>
          <body>
            <Navbar />
            {children}
          </body>
        </ClerkProvider>
      </QueryClientProvider>
    </html>
  );
}
