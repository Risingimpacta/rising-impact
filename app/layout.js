import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingTeamsButton from "@/components/FloatingTeamsButton";
import TrackPageView from "@/components/TrackPageView";
import { Bona_Nova_SC } from "next/font/google";
import { Suspense } from "react";

const bona = Bona_Nova_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Rising Impact",
  description: "Web3 • Blockchain • Digital Solutions",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bona.className}>
        <Navbar />
        {children}
        <FloatingTeamsButton />
        <Footer />
        <Suspense fallback={null}>
          <TrackPageView />
        </Suspense>
      </body>
    </html>
  );
}