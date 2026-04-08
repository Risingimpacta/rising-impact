import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingTeamsButton from "@/components/FloatingTeamsButton";
import { Bona_Nova_SC } from "next/font/google";

const bona = Bona_Nova_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Rising Impact",
  description: "Web, Software, Blockchain, Web3 development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bona.className}>
        <Navbar />
        {children}
        <FloatingTeamsButton />
        <Footer />
      </body>
    </html>
  );
}
