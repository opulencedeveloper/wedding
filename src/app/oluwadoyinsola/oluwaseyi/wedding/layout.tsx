import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invitation Management",
  description: "Manage wedding invitations for Oluwadoyinsolami & Oluwaseyi's wedding. Generate and track invitation links for guests.",
  robots: {
    index: false, // Admin/management pages should not be indexed
    follow: false,
  },
  openGraph: {
    title: "Invitation Management | Oluwadoyinsolami & Oluwaseyi Wedding",
    description: "Manage wedding invitations for Oluwadoyinsolami & Oluwaseyi's wedding.",
    url: "/verify",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitation Management | Oluwadoyinsolami & Oluwaseyi Wedding",
    description: "Manage wedding invitations for Oluwadoyinsolami & Oluwaseyi's wedding.",
    images: ["/assets/logo/logo.png"],
  },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

