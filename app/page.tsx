import { HeroSection } from "@/components/hero-section"
import { BirdwatcherRankings } from "@/components/birdwatcher-rankings"
import { FeaturedBirds } from "@/components/featured-birds"
import { CommunitySection } from "@/components/community-section"
import { ExcursionsSection } from "@/components/excursions-section"
import { EducationalSection } from "@/components/educational-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pl-0">
        <HeroSection />
        <BirdwatcherRankings />
        <FeaturedBirds />
        <CommunitySection />
        <ExcursionsSection />
        <EducationalSection />
      </main>
      <Footer />
    </div>
  )
}
