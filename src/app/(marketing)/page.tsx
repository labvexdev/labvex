import { HeroSection } from "@/components/landing/HeroSection";
import { PlatformVision } from "@/components/landing/PlatformVision";
import { InfrastructureSection } from "@/components/landing/InfrastructureSection";
import { VexyAISection } from "@/components/landing/VexyAISection";
import { NetworkPreview } from "@/components/landing/NetworkPreview";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <PlatformVision />
      <InfrastructureSection />
      <VexyAISection />
      <NetworkPreview />
      <FinalCTA />
    </main>
  );
}
