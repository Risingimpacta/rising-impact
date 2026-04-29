import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingTeamsButton from "@/components/FloatingTeamsButton";
import TrackPageView from "@/components/TrackPageView";
import { Bona_Nova_SC } from "next/font/google";
import { Suspense } from "react";
import Script from "next/script";

const bona = Bona_Nova_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Rising Impact - Web3, Blockchain & Digital Innovation",
  description: "Professional Web3, Blockchain, Software Development, and Web solutions. Rising Impact delivers innovative digital solutions for modern businesses.",
  keywords: "web development, software development, blockchain, Web3, crypto, dApps, smart contracts, DeFi, DEX, Rising Impact, digital innovation",
  authors: [{ name: "Rising Impact" }],
  creator: "Rising Impact",
  publisher: "Rising Impact",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Rising Impact - Web3, Blockchain & Digital Innovation",
    description: "Professional Web3, Blockchain, Software Development, and Web solutions. Building the future of digital innovation.",
    url: "https://rising-impact.vercel.app",
    siteName: "Rising Impact",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rising Impact - Building the Future of Digital Innovation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rising Impact - Web3, Blockchain & Digital Innovation",
    description: "Professional Web3, Blockchain, Software Development, and Web solutions.",
    images: ["/og-image.jpg"],
  },
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
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://rising-impact.vercel.app",
  },
  category: "technology",
  applicationName: "Rising Impact",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics - G-36R2J791CF */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-36R2J791CF"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-36R2J791CF');
            `,
          }}
        />
      </head>
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