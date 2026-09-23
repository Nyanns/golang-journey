import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Navbar = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('nindhita_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nindhita_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nindhita_theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fafbfc]/90 dark:bg-[#080b10]/90 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/60 transition-colors">
      <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
        
        {/* Brand */}
        <a
          href="#"
          className="font-mono text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          {portfolioData.personal.brand}
        </a>

        {/* Navigation & Actions */}
        <nav className="flex items-center gap-5">
          <a
            href="#projects"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Work
          </a>
          <a
            href="#stack"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Stack
          </a>
          <a
            href="#writing"
            className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Writing
          </a>
          <a
            href={portfolioData.personal.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
          </button>
        </nav>

      </div>
    </header>
  );
};
