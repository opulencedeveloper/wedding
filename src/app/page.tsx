import type { Metadata } from "next";
import Footer from "@/component/home/Footer";
import HeroSection from "@/component/home/HeroSection";
import MakeHotelReservation from "@/component/home/MakeHotelReservation";
import OurGallery from "@/component/home/OurGallery";
import OurStory from "@/component/home/OurStory";
import QandA from "@/component/home/QandA";
import WeddingEvent from "@/component/home/WeddingEvent";
import AnimatedSection from "@/component/layout/AnimatedSection";
import ParallaxSection from "@/component/layout/ParallaxSection";
import StaggerChildren from "@/component/layout/StaggerChildren";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Home",
  description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada. View our love story, gallery, event details, and RSVP to celebrate with us.",
  openGraph: {
    title: "Oluwadoyinsolami & Oluwaseyi Wedding | March 26, 2026",
    description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada.",
    url: "/",
    siteName: "Oluwadoyinsolami & Oluwaseyi Wedding",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Oluwadoyinsolami & Oluwaseyi Wedding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwadoyinsolami & Oluwaseyi Wedding | March 26, 2026",
    description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada.",
    images: ["/assets/logo/logo.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
