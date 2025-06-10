import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProductGrid />
      <AboutSection />
    </div>
  )
}
