import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LABVEX — The Unified DeSci Operating System",
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg-carbon)]">
      <LandingNav />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}
