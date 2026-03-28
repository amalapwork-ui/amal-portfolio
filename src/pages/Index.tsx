import { useState, useCallback } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import DinoGame from "@/components/DinoGame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const onComplete = useCallback(() => setLoaded(true), []);

  return (
    <ThemeProvider>
      <CustomCursor />
      {!loaded && <Loader onComplete={onComplete} />}
      {loaded && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <Marquee />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
            <EducationSection />
            <DinoGame />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
};

export default Index;
