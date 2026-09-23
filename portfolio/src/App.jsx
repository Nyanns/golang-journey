import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlagshipShowcase } from './components/FlagshipShowcase';
import { TechMatrix } from './components/TechMatrix';
import { SignalsSection } from './components/SignalsSection';
import { WritingSection } from './components/WritingSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] dark:bg-[#080b10] text-slate-800 dark:text-slate-200 antialiased">
      {/* Sticky Minimal Navigation */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="flex-1">
        <HeroSection />
        <FlagshipShowcase />
        <TechMatrix />
        <SignalsSection />
        <WritingSection />
        <ExperienceSection />
      </main>

      {/* Colophon & Contact Footer */}
      <Footer />
    </div>
  );
};

export default App;
