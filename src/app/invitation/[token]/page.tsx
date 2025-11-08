import type { Metadata } from "next";
import HomePageClient from "@/app/HomePageClient";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  return {
    title: "Wedding Invitation",
    description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada. View our love story, gallery, event details, and RSVP to celebrate with us.",
    openGraph: {
      title: "Oluwadoyinsolami & Oluwaseyi Wedding | March 26, 2026",
      description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada.",
      url: `/invitation/${token}`,
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
      canonical: `/invitation/${token}`,
    },
  };
}

export default async function InvitationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return <HomePageClient token={token} />;
}

