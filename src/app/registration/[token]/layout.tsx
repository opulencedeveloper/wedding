import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Registration",
  description: "Register for Oluwadoyinsolami & Oluwaseyi's wedding on March 26, 2026. Complete your RSVP and provide your details to celebrate with us in Toronto, Canada.",
  robots: {
    index: false, // Registration pages should not be indexed
    follow: false,
  },
  openGraph: {
    title: "Wedding Registration | Oluwadoyinsolami & Oluwaseyi",
    description: "Register for Oluwadoyinsolami & Oluwaseyi's wedding on March 26, 2026 in Toronto, Canada.",
    url: "/registration",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Oluwadoyinsolami & Oluwaseyi Wedding Registration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Registration | Oluwadoyinsolami & Oluwaseyi",
    description: "Register for Oluwadoyinsolami & Oluwaseyi's wedding on March 26, 2026 in Toronto, Canada.",
    images: ["/assets/logo/logo.png"],
  },
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

