import React, { useState } from 'react';
import { 
  Server, 
  ShieldCheck, 
  Database, 
  Globe, 
  CheckCircle2, 
  Cpu, 
  Terminal,
  Check
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const TechMatrix = () => {
  const { techStack } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('All');

  const categoryIcons = {
    "Go Backend & Concurrency": Server,
    "API Security & Defense-in-Depth": ShieldCheck,
    "Databases & In-Memory Systems": Database,
    "Search Engine & Bot Infrastructure": Globe,
    "QA Automation & Testing (SDET)": CheckCircle2,
    "Cloud, Media & Frontend": Cpu,
  };

  const categories = ['All', ...techStack.map((c) => c.category)];

  const filteredStack = activeCategory === 'All'
    ? techStack
    : techStack.filter((c) => c.category === activeCategory);

  return (
    <section id="tech-stack" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Full Technical Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Production Technologies & Standards
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Exhaustive inventory of backend systems, defensive security mechanisms, and automated QA frameworks.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                  : 'bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStack.map((group) => {
            const Icon = categoryIcons[group.category] || Terminal;
            return (
              <div
                key={group.category}
                className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-colors shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-slate-100 dark:border-slate-800/80">
                    <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="text-xs font-mono font-bold tracking-tight text-slate-900 dark:text-white">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-2">
                    {group.skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
