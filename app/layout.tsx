"use client";

import Navbar from "@/components/Navbar";
import QueryClientProvider from "@/lib/providers/query";
import { ThemeProvider } from "@/lib/providers/theme";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

import { Red_Hat_Text } from "next/font/google";

const font = Red_Hat_Text({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider>
      <html>
        <ClerkProvider
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
              socialButtonsVariant: "iconButton",
            },
          }}
        >
          <body className={font.className}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
            </ThemeProvider>
          </body>
        </ClerkProvider>
      </html>
    </QueryClientProvider>
  );
}
