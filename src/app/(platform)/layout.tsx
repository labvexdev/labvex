import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "LABVEX Platform",
    template: "%s | LABVEX",
  },
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[var(--bg-carbon)] overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppTopBar />
        <main className="flex-1 overflow-y-auto sci-grid">{children}</main>
      </div>
    </div>
  );
}
