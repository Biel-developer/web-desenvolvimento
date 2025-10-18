import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ContentGrid } from "@/components/content-grid"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ContentGrid />
      </main>
      <Footer />
    </div>
  )
}
