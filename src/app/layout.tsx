import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dual-Foot Soccer Lab",
  description:
    "Six-week backyard soccer program for dual-foot control, footwork, and shooting power.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:py-8">
          {children}
        </main>
        <footer className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          Dual-Foot Soccer Lab · Both feet, every drill · ~30 min backyard sessions
        </footer>
      </body>
    </html>
  );
}
