import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductComparison } from "@/components/product-comparison"
import { ServicesSection } from "@/components/services-section"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { Chatbot } from "@/components/chatbot"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ProductComparison />
      <ServicesSection />
      <Testimonials />
      <Footer />
      <Chatbot />
    </main>
  )
}
