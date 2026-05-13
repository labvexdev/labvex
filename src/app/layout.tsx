import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LABVEX — The Unified DeSci Operating System",
    template: "%s | LABVEX",
  },
  description:
    "LABVEX is an AI-native decentralized science ecosystem combining scientific collaboration, AI-assisted research, decentralized identity, and scientific reputation. Don't trust papers. Verify data. Own discovery.",
  keywords: [
    "DeSci",
    "decentralized science",
    "AI research",
    "biotech",
    "scientific collaboration",
    "Solana",
    "longevity",
    "neuroscience",
    "genetics",
  ],
  authors: [{ name: "LABVEX" }],
  creator: "LABVEX",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://labvex.io"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "LABVEX — The Unified DeSci Operating System",
    description:
      "AI-native decentralized science. Don't trust papers. Verify data. Own discovery.",
    siteName: "LABVEX",
  },
  twitter: {
    card: "summary_large_image",
    title: "LABVEX — The Unified DeSci Operating System",
    description: "AI-native decentralized science ecosystem.",
    creator: "@labvex",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1117",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#161b22",
                color: "#f5f7fa",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "14px",
                fontFamily: "var(--font-inter)",
              },
              success: {
                iconTheme: { primary: "#5ccb5f", secondary: "#0d1117" },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
