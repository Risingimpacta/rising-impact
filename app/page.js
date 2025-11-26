import HeroIntro from "@/components/HeroIntro";
import Hero from "@/components/Hero";
import ApiPartners from "@/components/ApiPartners";
import MediaPartners from "@/components/MediaPartners";
import DemoSection from "@/components/DemoSection";

export default function Home() {
  return (
    <>
      <HeroIntro />   {/* NEW CINEMATIC INTRO */}
      <Hero />
      <ApiPartners />
      <MediaPartners />
      <DemoSection />
    </>
  );
}
