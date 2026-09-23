import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-12 sm:py-16 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="space-y-8">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Background
          </h2>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Experience & Cohorts
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {experience.map((item) => (
            <div key={item.organization} className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {item.role}
                </h3>
                <span className="text-[11px] font-mono text-zinc-400">
                  {item.period}
                </span>
              </div>

              <p className="text-xs font-mono text-sky-600 dark:text-sky-400">
                {item.organization}
              </p>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                {item.summary}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
