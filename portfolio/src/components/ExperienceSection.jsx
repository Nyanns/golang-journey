import React from 'react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="px-4 py-8 md:px-0">
      <div className="mb-8">
        <h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
          <svg
            width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
            <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
            <path d="M12 12l0 .01" />
            <path d="M3 13a20 20 0 0 0 18 0" />
          </svg>
          <span style={{ color: 'var(--ctp-text)' }}>Experience</span>
        </h2>
      </div>

      <div className="space-y-6">
        {experience.map((item) => (
          <div
            key={item.company}
            className="rounded-xl p-5 transition-colors"
            style={{
              border: '1px solid var(--ctp-surface0)',
              backgroundColor: 'var(--ctp-base)',
            }}
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--ctp-text)' }}>
                  {item.role}
                </h3>
                <p className="text-xs font-medium text-accent">
                  {item.company}
                </p>
              </div>
              <span className="font-mono text-xs" style={{ color: 'var(--ctp-overlay1)' }}>
                {item.period}
              </span>
            </div>

            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: 'var(--ctp-subtext0)' }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
