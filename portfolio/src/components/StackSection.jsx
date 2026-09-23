import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const CategoryIcon = ({ name }) => {
  const lower = (name || '').toLowerCase();
  if (lower.includes('backend') || lower.includes('concurrency') || lower.includes('konkurensi')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
        <path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
        <path d="M7 8l0 .01" />
        <path d="M7 16l0 .01" />
      </svg>
    );
  }
  if (lower.includes('qa') || lower.includes('test') || lower.includes('otomasi')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M7 12l5 5l10 -10" />
        <path d="M2 12l5 5m5 -5l5 -5" />
      </svg>
    );
  }
  if (lower.includes('security') || lower.includes('keamanan') || lower.includes('kriptografi')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
        <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M12 12l0 2.5" />
      </svg>
    );
  }
  if (lower.includes('data') || lower.includes('storage') || lower.includes('penyimpanan')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
        <path d="M4 6v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
        <path d="M4 12v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
      </svg>
    );
  }
  if (lower.includes('seo') || lower.includes('search')) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
        <path d="M10 13v.01" />
        <path d="M10 7v3" />
      </svg>
    );
  }
  // DevOps, Infra
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
      <path d="M6.657 16c-2.572 0 -4.657 -2.007 -4.657 -4.483c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.708c2.613 -.709 5.378 .672 6.444 3.19c1.691 .36 2.871 1.782 2.881 3.501c0 2.476 -2.085 4.482 -4.657 4.482h-9" />
      <path d="M12 16v5" />
      <path d="M9 19l3 3l3 -3" />
    </svg>
  );
};

export const StackSection = () => {
  const { data, t } = useLanguage();
  const { stack } = data;

  return (
    <section id="stack" className="px-4 py-8 md:px-0">
      {/* Header */}
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
            <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
            <path d="M12 12l8 -4.5" />
            <path d="M12 12l0 9" />
            <path d="M12 12l-8 -4.5" />
          </svg>
          <span style={{ color: 'var(--ctp-text)' }}>{t('stack.title')}</span>
        </h2>
      </div>

      {/* 6 Category Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stack.map((group) => (
          <div
            key={group.category}
            className="group flex flex-col justify-between rounded-xl p-5 shadow-lg transition-all duration-200 hover:border-accent"
            style={{
              border: '1px solid var(--ctp-surface0)',
              backgroundColor: 'var(--ctp-base)',
            }}
          >
            <div>
              <div className="mb-3.5 flex items-center gap-2.5">
                <CategoryIcon name={group.category} />
                <h3 className="font-mono text-sm font-bold" style={{ color: 'var(--ctp-text)' }}>
                  {group.category}
                </h3>
              </div>

              <ul className="space-y-1.5 pt-1">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-xs font-mono transition-colors"
                    style={{ color: 'var(--ctp-subtext0)' }}
                  >
                    <span className="text-accent text-[10px]">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
