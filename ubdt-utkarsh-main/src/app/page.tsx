"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import Hero from "./components/Hero"

// Lazy load below-fold components for better initial page load
const Gallery = dynamic(() => import("./components/Gallery"), {
  loading: () => (
    <div className="py-12 md:py-24 flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading gallery...</div>
    </div>
  ),
  ssr: true,
})

const Events = dynamic(() => import("./components/Events"), {
  loading: () => (
    <div className="py-16 md:py-24 flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading events...</div>
    </div>
  ),
  ssr: true,
})

const Sponsors = dynamic(() => import("./components/Sponsors"), {
  loading: () => (
    <div className="py-12 md:py-24 flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading sponsors...</div>
    </div>
  ),
  ssr: true,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Above the fold, loaded immediately */}
      <Hero />

      {/* Below-fold components - Lazy loaded */}
      <Suspense fallback={<div className="animate-pulse h-96" />}>
        {/* Gallery Carousel Section */}
        <Gallery />

        {/* Featured Events */}
        <Events />

        {/* Sponsors Section */}
        <Sponsors />
      </Suspense>
    </div>
  )
}

