import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import TryItSection from "@/components/TryItSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <Features />
      <HowItWorks />
      <About />
      <TryItSection />
    </main>
  );
}