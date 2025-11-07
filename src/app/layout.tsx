import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "@/component/layout/BackgroundMusic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Oluwadoyinsolami & Oluwaseyi Wedding | March 26, 2026",
    template: "%s | Oluwadoyinsolami & Oluwaseyi Wedding"
  },
  description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada. RSVP, view our story, gallery, and event details.",
  keywords: ["wedding", "Oluwadoyinsolami", "Oluwaseyi", "Toronto", "Canada", "wedding invitation", "RSVP", "wedding 2026"],
  authors: [{ name: "Oluwadoyinsolami & Oluwaseyi" }],
  creator: "Oluwadoyinsolami & Oluwaseyi",
  publisher: "Oluwadoyinsolami & Oluwaseyi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Oluwadoyinsolami & Oluwaseyi Wedding | March 26, 2026",
    description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada.",
    siteName: "Oluwadoyinsolami & Oluwaseyi Wedding",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Oluwadoyinsolami & Oluwaseyi Wedding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oluwadoyinsolami & Oluwaseyi Wedding | March 26, 2026",
    description: "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada.",
    images: ["/assets/logo/logo.png"],
    creator: "@wedding",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Oluwadoyinsolami & Oluwaseyi Wedding",
    "description": "Join us in celebrating the wedding of Oluwadoyinsolami & Oluwaseyi on March 26, 2026 in Toronto, Canada.",
    "startDate": "2026-03-26T14:00:00-05:00",
    "endDate": "2026-03-26T23:00:00-05:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Toronto, Canada",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toronto",
        "addressCountry": "CA"
      }
    },
    "image": `${baseUrl}/assets/logo/logo.png`,
    "organizer": {
      "@type": "Person",
      "name": "Oluwadoyinsolami & Oluwaseyi"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/registration`,
      "price": "0",
      "priceCurrency": "CAD",
      "availability": "https://schema.org/InStock",
      "validFrom": "2025-01-01T00:00:00-05:00"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {children}
              <BackgroundMusic />
            </body>
    </html>
  );
}
