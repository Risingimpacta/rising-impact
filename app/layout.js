// app/layout.js
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingTeamsButton from "@/components/FloatingTeamsButton";
import TrackPageView from "@/components/TrackPageView";
import { Bona_Nova_SC } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react"; // Import Suspense

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
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to Google domains for better performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>

      <body className={bona.className}>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-36R2J791CF"
          strategy="afterInteractive"
        />
        
        <Script id="google-analytics-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-36R2J791CF', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>

        <Navbar />
        {children}
        <FloatingTeamsButton />
        <Footer />
        
        {/* Page View Tracking - WRAPPED IN SUSPENSE */}
        <Suspense fallback={null}>
          <TrackPageView />
        </Suspense>
      </body>
    </html>
  );
}