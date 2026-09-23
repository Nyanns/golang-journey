import React from 'react';
import { portfolioData } from '../data/portfolioData';

const tagColors = {
  go: 'var(--ctp-sapphire)',
  gin: 'var(--ctp-maroon)',
  postgresql: 'var(--ctp-blue)',
  redis: 'var(--ctp-red)',
  react: 'var(--ctp-sky)',
  tailwindcss: 'var(--ctp-teal)',
  docker: 'var(--ctp-blue)',
  vercel: 'var(--ctp-text)',
  postman: 'var(--ctp-peach)',
  newman: 'var(--ctp-green)',
  chai: 'var(--ctp-yellow)',
  playwright: 'var(--ctp-green)',
  cypress: 'var(--ctp-teal)',
  ieee: 'var(--ctp-lavender)',
  jira: 'var(--ctp-sapphire)',
  github: 'var(--ctp-text)',
  security: 'var(--ctp-yellow)',
  clean: 'var(--ctp-green)',
  lua: 'var(--ctp-mauve)',
  seo: 'var(--ctp-sapphire)',
  default: 'var(--ctp-overlay1)',
};

const getTagColor = (tag) => {
  const lower = tag.toLowerCase();
  for (const [key, color] of Object.entries(tagColors)) {
    if (lower.includes(key)) return color;
  }
  return tagColors.default;
};

export const WorkSection = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="px-4 py-8 md:px-0">
      {/* Section Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-semibold md:text-3xl">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
          </svg>
          <span style={{ color: 'var(--ctp-text)' }}>Featured Projects</span>
        </h2>
        <a
          href={portfolioData.personal.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden items-center gap-1 font-mono text-sm text-accent transition-colors hover:underline sm:inline-flex"
        >
          <span>All repositories</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path d="M5 12l14 0" />
            <path d="M13 18l6 -6" />
            <path d="M13 6l6 6" />
          </svg>
        </a>
      </div>

      {/* Project Cards Grid - 2 Featured Projects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            style={{
              border: '1px solid var(--ctp-surface0)',
              backgroundColor: 'var(--ctp-mantle)',
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--ctp-accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--ctp-surface0)'}
          >
            {/* Visual Banner */}
            <div className="relative aspect-video w-full overflow-hidden" style={{ borderBottom: '1px solid var(--ctp-surface0)' }}>
              {project.isLogo ? (
                // Logo-style banner: dark bg + centered logo
                <div
                  className="flex h-full w-full items-center justify-center p-8"
                  style={{ background: 'linear-gradient(135deg, var(--ctp-crust) 0%, var(--ctp-mantle) 50%, var(--ctp-surface0) 100%)' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    width="240"
                    height="96"
                    loading="lazy"
                    decoding="async"
                    className="max-h-24 max-w-[60%] object-contain opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  {/* Subtle decorative bg text */}
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-5"
                    aria-hidden
                    style={{ fontSize: '7rem', fontWeight: 900, fontFamily: 'monospace', color: 'var(--ctp-text)', letterSpacing: '-0.05em', userSelect: 'none' }}
                  >
                    QA
                  </div>
                </div>
              ) : (
                // Photo banner — object-contain agar tidak terpotong
                <div
                  className="flex h-full w-full items-center justify-center overflow-hidden"
                  style={{ backgroundColor: 'var(--ctp-crust)' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    width="600"
                    height="338"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col justify-between space-y-4 p-5">
              <div className="space-y-2.5">
                {/* Title and Action Links Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3
                      className="text-xl font-bold transition-colors group-hover:text-accent"
                      style={{ color: 'var(--ctp-text)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono font-medium" style={{ color: 'var(--ctp-overlay1)' }}>
                      {project.role}
                    </p>
                  </div>

                  {/* Prominent Action Links (GitHub & Live Platform) */}
                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold shadow-sm transition-all duration-150 hover:scale-105"
                        style={{
                          backgroundColor: 'var(--ctp-accent)',
                          color: 'var(--ctp-base)',
                        }}
                      >
                        <span>Live Demo</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                          <path d="M11 13l9 -9" />
                          <path d="M15 4h5v5" />
                        </svg>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors hover:text-accent hover:border-accent"
                        style={{
                          backgroundColor: 'var(--ctp-surface0)',
                          color: 'var(--ctp-text)',
                          border: '1px solid var(--ctp-surface1)',
                        }}
                        title="View GitHub Repository"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
                        </svg>
                        <span>GitHub ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed md:text-sm" style={{ color: 'var(--ctp-subtext0)' }}>
                  {project.description}
                </p>
              </div>

              {/* Tech Tags with Tag Icon */}
              <div className="flex items-start gap-2 pt-2 text-xs">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1 shrink-0"
                  style={{ color: 'var(--ctp-overlay0)' }}
                >
                  <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                  <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" />
                </svg>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tag) => (
                    <span
                      key={tag}
                      className="rounded px-2 py-0.5 font-mono text-[11px] font-semibold transition-colors"
                      style={{
                        backgroundColor: 'var(--ctp-surface0)',
                        color: getTagColor(tag),
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
