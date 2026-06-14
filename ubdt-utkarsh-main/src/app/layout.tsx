import type React from "react"
import type { Metadata, Viewport } from "next"
import './globals.css'
import { Inter } from "next/font/google"
import { cn } from "@/src/lib/utils"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.utkarshubdt.in"),
  title: {
    default: "Utkarsh 2k26 - Inter College Technical & Cultural Festival",
    template: "%s | Utkarsh 2k26",
  },
  description:
    "Utkarsh 2k26 is the national level inter-college technical and cultural festival organized by University BDT College of Engineering, Davanagere. Join us for 3 days of innovation, creativity and technical excellence with 23+ events and ₹1.5L+ prize pool.",
  keywords: [
    "UBDT",
    "Utkarsh",
    "2k26",
    "technical festival",
    "cultural festival",
    "college event",
    "college festival",
    "inter college",
    "University BDT College",
    "Davanagere",
    "student events",
    "tech fest",
    "cultural fest",
    "innovation",
    "creativity",
    "technical excellence",
    "engineering college",
    "college competition",
    "festivals in Karnataka",
    "events in Karnataka",
    "college life",
    "youth festival",
    "student activities",
    "Karnataka engineering fest",
    "UBDTCE",
  ],
  authors: [{ name: "University BDT College of Engineering" }],
  creator: "Utkarsh Team",
  publisher: "University BDT College of Engineering",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.utkarshubdt.in",
    siteName: "Utkarsh 2k26",
    title: "Utkarsh 2k26 - National Level Inter College Technical & Cultural Festival",
    description:
      "Join the national level inter-college technical and cultural festival at University BDT College of Engineering, Davanagere. 23+ events, 3 days, ₹1.5L+ prize pool!",
    images: [
      {
        url: "https://www.utkarshubdt.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Utkarsh 2k26 - Technical & Cultural Festival",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Utkarsh 2k26 - National Level Inter College Technical & Cultural Festival",
    description:
      "Join the national level inter-college technical and cultural festival at University BDT College of Engineering, Davanagere. 23+ events, 3 days, ₹1.5L+ prize pool!",
    images: ["https://www.utkarshubdt.in/og-image.png"],
    creator: "@demo",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "https://www.utkarshubdt.in",
  },
  category: "Education",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Utkarsh 2k26",
    description:
      "National level inter-college technical and cultural festival organized by University BDT College of Engineering, Davanagere.",
    startDate: "2026-02-20",
    endDate: "2026-02-22",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "University BDT College of Engineering",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hadadi Road, Post Box No. 304",
        addressLocality: "Davanagere",
        postalCode: "577004",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "University BDT College of Engineering",
      url: "https://ubdtce.org",
    },
    image: "https://www.utkarshubdt.in/og-image.png",
    url: "https://www.utkarshubdt.in",
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ScrollToTop />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
