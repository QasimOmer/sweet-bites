"use client"

import { useEffect } from "react"
import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { initEmailJS } from "@/lib/email"

export default function HomePage() {
  useEffect(() => {
    // Initialize EmailJS on the client side
    initEmailJS()
  }, [])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductGrid />
      <AboutSection />
    </div>
  )
}
