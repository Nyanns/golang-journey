import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { StackSection } from './components/StackSection';
import { SignalsWritingSection } from './components/SignalsWritingSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <div className="min-h-screen bg-[#fafbfc] dark:bg-[#080b10] text-zinc-800 dark:text-zinc-200 antialiased selection:bg-sky-500/20 selection:text-sky-700 dark:selection:text-sky-300">
      {/* Minimal Sticky Header */}
      <Navbar />

      {/* Main Single-Document Reading Flow */}
      <main className="max-w-2xl mx-auto px-5">
        <HeroSection />
        <WorkSection />
        <StackSection />
        <SignalsWritingSection />
        <ExperienceSection />
        <Footer />
      </main>
    </div>
  );
};

export default App;
