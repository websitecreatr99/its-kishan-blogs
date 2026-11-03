"use client";

import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ChunkErrorHandler from "@/src/components/ChunkErrorHandler";
import { SegmentStateProvider } from "./SegmentStateContext";

export default function RootClientWrapper({ children }) {
  return (
    <SegmentStateProvider>
      <Script id="theme-switcher" strategy="beforeInteractive">
        {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }`}
      </Script>

      <ChunkErrorHandler />
      <SpeedInsights />
      <Analytics />
      <Header />
      {children}
      <Footer />
      <GoogleAnalytics gaId="G-SDG5E7TL7J" />
    </SegmentStateProvider>
  );
}
