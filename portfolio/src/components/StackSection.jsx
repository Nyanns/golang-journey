import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const StackSection = () => {
  const { stack } = portfolioData;

  return (
    <section id="stack" className="py-12 sm:py-16 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="space-y-6">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Technical Stack
          </h2>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Technologies & Engineering Standards
          </p>
        </div>

        {/* Quiet 2-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-2">
          {stack.map((group) => (
            <div key={group.name} className="space-y-2">
              <h3 className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                {group.name}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-mono">
                {group.items.join(' • ')}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
