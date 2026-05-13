import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg-secondary)" }}>
      <AppSidebar />
      <div style={{ flex: 1, marginLeft: 220, display: "flex", flexDirection: "column" }}>
        <AppTopBar />
        <main style={{ flex: 1, paddingTop: 56, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
