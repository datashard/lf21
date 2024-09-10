import LandingPage from "@/components/Landing";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Little Free Library",
  description: "Little Free Library Listings",
};

export default function Home() {
  return <LandingPage />;
}
