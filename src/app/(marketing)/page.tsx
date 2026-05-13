import { ParticleBackground } from "@/components/landing/ParticleBackground";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { VexyShowcase } from "@/components/landing/VexyShowcase";
import { EcosystemSection } from "@/components/landing/EcosystemSection";
import { CommunitySection } from "@/components/landing/CommunitySection";

export default function LandingPage() {
  return (
    <div className="relative gradient-hero sci-grid">
      <ParticleBackground />
      <div className="relative z-10">
        <HeroSection />
        <EcosystemSection />
        <FeaturesSection />
        <VexyShowcase />
        <CommunitySection />
      </div>
    </div>
  );
}
