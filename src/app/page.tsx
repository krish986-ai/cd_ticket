import Hero from "@/components/Hero";
import Features from "@/components/Features";
import EventSection from "@/components/EventSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#09090b]">
      <Hero />
      <Features />
      <EventSection />
      <Footer />
    </main>
  );
}