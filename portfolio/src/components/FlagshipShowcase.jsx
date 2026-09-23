import React from 'react';
import { ExternalLink, Sparkles, Layers, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const FlagshipShowcase = () => {
  const { flagshipProjects } = portfolioData;
  const mainProject = flagshipProjects[0];
  const secondaryProjects = flagshipProjects.slice(1);

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Production Systems</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Flagship Engineering Work
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Battle-tested applications engineered with Go Clean Architecture, defense-in-depth API security, and rigorous testing suites.
          </p>
        </div>

        {/* Featured Flagship: Lumiina */}
        {mainProject && (
          <div className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs mb-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {mainProject.status}
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  Vercel Edge Anycast (sin1)
                </span>
              </div>

              <div className="flex items-center gap-2">
                {mainProject.githubUrl && (
                  <a
                    href={mainProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {mainProject.liveUrl && (
                  <a
                    href={mainProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-xs"
                  >
                    <span>Visit Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {mainProject.title}
            </h3>
            <p className="text-xs sm:text-sm font-mono font-medium text-sky-600 dark:text-sky-400 mt-1">
              {mainProject.subtitle}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed max-w-3xl">
              {mainProject.description}
            </p>

            {/* Production Engineering Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 pt-2">
              {mainProject.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-slate-50 dark:bg-[#12151e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3"
                >
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span className="text-base sm:text-lg font-mono font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    {m.value}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight block mt-0.5 line-clamp-1">
                    {m.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
              {mainProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Secondary Showcases: QA Suite & Go Systems Lab */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryProjects.map((project) => (
            <div
              key={project.title}
              className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                    {project.status}
                  </span>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                      aria-label="View Source Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 my-4">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="bg-slate-50 dark:bg-[#12151e] border border-slate-200/80 dark:border-slate-800/80 rounded-lg p-2 text-center"
                    >
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block truncate">
                        {m.label}
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white block mt-0.5 truncate">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
