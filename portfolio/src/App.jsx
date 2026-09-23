import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundEffect } from './components/BackgroundEffect';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WorkSection } from './components/WorkSection';
import { StackSection } from './components/StackSection';
import { DashboardSection } from './components/DashboardSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <ThemeProvider>
      <div
        className="relative min-h-screen font-sans antialiased"
        style={{ backgroundColor: 'var(--ctp-base)', color: 'var(--ctp-text)' }}
      >
        {/* Dynamic Colorful Ambient Background Orbs */}
        <BackgroundEffect />

        <div className="mx-auto flex min-h-screen max-w-[92%] flex-col md:max-w-[82%]">
          <Navbar />
          <main className="flex-1 px-0 py-4 md:px-4">
            <div className="mx-auto max-w-6xl space-y-8 px-0 py-3 md:space-y-10 md:px-4 md:py-4">
              <HeroSection />
              <WorkSection />
              <StackSection />
              <DashboardSection />
              <ExperienceSection />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
