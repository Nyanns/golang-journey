import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const WorkSection = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-12 sm:py-16 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="space-y-10">
        
        {/* Section Heading */}
        <div className="space-y-1">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Selected Work
          </h2>
          <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Production Systems & Architecture
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-10">
          {projects.map((project) => (
            <article key={project.title} className="space-y-3">
              
              {/* Project Meta & Links */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    {project.title}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      <span>Source</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {project.summary}
              </p>

              {/* Architecture Points */}
              <ul className="space-y-1.5 pt-1">
                {project.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <span className="text-zinc-400 dark:text-zinc-600 select-none">—</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
