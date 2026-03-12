import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="bg-background">
      <Navbar />
      <HeroSection />
      <div id="mission">
        <MissionSection />
      </div>
      <div id="process">
        <ProcessSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
};

export default Index;
