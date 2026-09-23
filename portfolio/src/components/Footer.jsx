import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { data, t } = useLanguage();
  const { personal, recentCommits } = data;

  // Session timer: tracks how long user has been on site
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: personal.links.github,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: personal.links.linkedin,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 11v5" />
          <path d="M8 8v.01" />
          <path d="M12 16v-5" />
          <path d="M16 16v-3a2 2 0 1 0 -4 0" />
          <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
        </svg>
      ),
    },
    {
      name: 'Medium',
      url: personal.links.medium,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5a2.5 2.5 0 0 1 2.5 -2.5h11a2.5 2.5 0 0 1 2.5 2.5" />
          <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
        </svg>
      ),
    },
    {
      name: 'HackTheBox',
      url: personal.links.hackthebox,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5" />
          <path d="M12 12l8 -4.5" />
          <path d="M12 12v9" />
          <path d="M12 12l-8 -4.5" />
        </svg>
      ),
    },
    {
      name: 'LeetCode',
      url: personal.links.leetcode,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 8l-4 4l4 4" />
          <path d="M17 8l4 4l-4 4" />
          <path d="M14 4l-4 16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative mx-auto mb-6 w-full max-w-6xl px-4 md:px-0">
      {/* Top Webring / Production Pill tab */}
      <div className="relative flex justify-end">
        <div
          className="flex items-center gap-1.5 rounded-t-lg border-t border-r border-l px-3 py-1 text-xs shadow-sm"
          style={{
            backgroundColor: 'var(--ctp-mantle)',
            borderColor: 'var(--ctp-surface0)',
            color: 'var(--ctp-subtext1)',
          }}
        >
          <span style={{ color: 'var(--ctp-overlay1)' }}>{t('footer.network')}</span>
          <a
            href="https://www.lumiina.art"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent hover:underline"
            title="Production anime illustration platform"
          >
            lumiina.art ↗
          </a>
        </div>
      </div>

      {/* Main Footer Box */}
      <footer
        className="flex flex-col items-center justify-between gap-y-3 rounded-lg border p-4 text-xs sm:text-sm md:flex-row md:gap-y-0"
        style={{
          backgroundColor: 'var(--ctp-crust)',
          borderColor: 'var(--ctp-surface0)',
          color: 'var(--ctp-subtext0)',
        }}
      >
        {/* Left: Copyright & System Status */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 md:justify-start">
          <span className="whitespace-nowrap font-medium" style={{ color: 'var(--ctp-text)' }}>
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span className="hidden sm:inline" style={{ color: 'var(--ctp-surface1)' }}>
            ·
          </span>
          <div className="flex items-center gap-1.5 whitespace-nowrap" title={t('footer.nominal')}>
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: 'var(--ctp-green)' }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: 'var(--ctp-green)' }}
              />
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--ctp-subtext1)' }}>
              {t('footer.nominal')}
            </span>
          </div>
        </div>

        {/* Right: Session Timer, Views, Git Commit, Social Icons */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 md:justify-end">
          {/* Session Timer */}
          <div className="flex items-center gap-1" title={t('footer.timerTooltip')}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--ctp-subtext1)' }}
            >
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M12 7v5l3 3" />
            </svg>
            <span className="font-mono text-xs text-accent">{formatTimer(seconds)}</span>
          </div>

          <span className="hidden sm:inline" style={{ color: 'var(--ctp-surface1)' }}>
            ·
          </span>

          {/* View Counter */}
          <span
            className="text-xs transition-colors hover:text-accent"
            style={{ color: 'var(--ctp-subtext1)' }}
            title="Site Impressions"
          >
            14,892 {t('footer.views')}
          </span>

          <span className="hidden sm:inline" style={{ color: 'var(--ctp-surface1)' }}>
            ·
          </span>

          {/* Deployment Git Commit */}
          <a
            href={recentCommits[0]?.url || 'https://github.com/Nyanns/golang-journey'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View latest deployment commit on GitHub"
            className="group flex items-center gap-1 font-mono text-xs transition-colors hover:text-accent"
            style={{ color: 'var(--ctp-subtext1)' }}
            title={t('footer.latestCommit')}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M12 3l0 6" />
              <path d="M12 15l0 6" />
            </svg>
            <span>{recentCommits[0]?.sha || 'main'}</span>
          </a>

          <span className="hidden sm:inline" style={{ color: 'var(--ctp-surface1)' }}>
            ·
          </span>

          {/* Social Icons row */}
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className="transition-transform duration-150 hover:scale-110 hover:text-accent"
                style={{ color: 'var(--ctp-subtext1)' }}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
