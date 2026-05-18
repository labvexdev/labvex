"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("labvex_user");
    if (!user) {
      router.replace("/onboarding");
    } else {
      setMounted(true);
    }
  }, [router, pathname]);

  if (!mounted) return null;

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
