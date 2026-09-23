import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// ── Typewriter hook — dipakai di navbar kiri atas ──
const useTypewriter = (phrases, typingSpeed = 150, deletingSpeed = 75, pauseMs = 2600) => {
  const [displayed, setDisplayed] = useState('');
  const stateRef = useRef({ displayed: '', phraseIdx: 0, isDeleting: false });
  const timerRef = useRef(null);

  useEffect(() => {
    stateRef.current = { displayed: '', phraseIdx: 0, isDeleting: false };
    setDisplayed('');

    const tick = () => {
      const { phraseIdx, isDeleting } = stateRef.current;
      const current = phrases[phraseIdx % phrases.length];
      const prev = stateRef.current.displayed;

      if (!isDeleting) {
        const next = current.slice(0, prev.length + 1);
        stateRef.current.displayed = next;
        setDisplayed(next);
        if (next === current) {
          stateRef.current.isDeleting = true;
          timerRef.current = setTimeout(tick, pauseMs);
        } else {
          timerRef.current = setTimeout(tick, typingSpeed + Math.random() * 40);
        }
      } else {
        const next = prev.slice(0, -1);
        stateRef.current.displayed = next;
        setDisplayed(next);
        if (next === '') {
          stateRef.current.isDeleting = false;
          stateRef.current.phraseIdx = (phraseIdx + 1) % phrases.length;
          timerRef.current = setTimeout(tick, 400);
        } else {
          timerRef.current = setTimeout(tick, deletingSpeed);
        }
      }
    };

    timerRef.current = setTimeout(tick, 400);
    return () => clearTimeout(timerRef.current);
  }, [phrases]);

  return displayed;
};

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { lang, toggleLang, t, data } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Looping phrases in the top-left terminal prompt (localized)
  const phrases = t('nav.typewriter');
  const typed = useTypewriter(phrases);

  const toggleTheme = () => {
    const next = theme === 'latte' ? 'mocha' : 'latte';
    setTheme(next);
  };

  const navLinks = [
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.stack'), href: '#stack' },
    { label: t('nav.activity'), href: '#activity' },
    { label: t('nav.experience'), href: '#experience' },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-30 flex h-16 items-center justify-between px-4 select-none backdrop-blur-md md:h-20 md:px-4"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--ctp-base) 88%, transparent)',
          borderBottom: '1px solid var(--ctp-surface0)',
        }}
      >
        {/* ── Kiri atas: terminal typing prompt ── */}
        <a
          href="#"
          className="flex items-center gap-1 font-mono text-sm font-medium"
          style={{ color: 'var(--ctp-subtext1)', textDecoration: 'none', minWidth: '180px' }}
          aria-label="Home"
        >
          <span style={{ color: 'var(--ctp-green)' }}>~/</span>
          <span style={{ color: 'var(--ctp-accent)' }} className="font-semibold">
            {typed}
          </span>
          <span
            className="animate-cursor-blink inline-block"
            style={{ color: 'var(--ctp-accent)', marginLeft: '1px' }}
            aria-hidden="true"
          >
            ▋
          </span>
        </a>

        {/* Mobile hamburger */}
        <button
          className="rounded p-2 transition-colors md:hidden"
          style={{ color: 'var(--ctp-text)' }}
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center space-x-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded px-3 py-2 text-sm font-medium transition-colors duration-150 hover:text-accent"
              style={{ color: 'var(--ctp-text)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={data.personal.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-3 py-2 text-sm font-medium transition-colors duration-150 hover:text-accent"
            style={{ color: 'var(--ctp-text)' }}
          >
            {t('nav.resume')}
          </a>

          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={t('nav.toggleTheme')}
            className="ml-2 cursor-pointer rounded px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:border-accent hover:text-accent"
            style={{
              color: 'var(--ctp-subtext0)',
              border: '1px solid var(--ctp-surface0)',
            }}
          >
            {theme === 'latte' ? '☾ Dark' : '☀ Light'}
          </button>

          {/* Language Toggle: EN / ID */}
          <button
            onClick={toggleLang}
            aria-label={t('nav.switchLang')}
            title={t('nav.switchLang')}
            className="ml-1.5 flex items-center gap-1 cursor-pointer rounded px-2.5 py-1.5 text-xs font-mono font-medium transition-all duration-200 hover:border-accent hover:text-accent"
            style={{
              color: 'var(--ctp-subtext0)',
              border: '1px solid var(--ctp-surface0)',
            }}
          >
            <span className={lang === 'en' ? 'font-bold text-accent' : 'opacity-50'}>EN</span>
            <span style={{ color: 'var(--ctp-surface2)' }}>/</span>
            <span className={lang === 'id' ? 'font-bold text-accent' : 'opacity-50'}>ID</span>
          </button>
        </nav>
      </header>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <aside
            className="absolute inset-y-0 right-0 flex w-64 flex-col shadow-xl"
            style={{
              backgroundColor: 'var(--ctp-mantle)',
              borderLeft: '1px solid var(--ctp-surface0)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex h-16 items-center justify-between border-b p-4"
              style={{ borderColor: 'var(--ctp-surface0)' }}
            >
              <span className="font-mono text-sm font-semibold text-accent">
                ~/&nbsp;nindhita.xyz
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded hover:text-accent"
                style={{ color: 'var(--ctp-subtext1)' }}
                aria-label="Close navigation menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6l-12 12" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded p-2 text-sm transition-colors duration-150 hover:text-accent"
                      style={{ color: 'var(--ctp-text)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <hr style={{ borderColor: 'var(--ctp-surface1)' }} className="my-2" />
                </li>
                <li>
                  <a
                    href={data.personal.links.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded p-2 text-sm transition-colors hover:text-accent"
                    style={{ color: 'var(--ctp-text)' }}
                  >
                    {t('nav.resume')}
                  </a>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="w-full cursor-pointer rounded p-2 text-left text-sm transition-colors hover:text-accent"
                    style={{ color: 'var(--ctp-text)' }}
                  >
                    Theme: {theme === 'latte' ? '☾ Switch to Dark' : '☀ Switch to Light'}
                  </button>
                </li>
                <li>
                  <button
                    onClick={toggleLang}
                    className="flex w-full items-center justify-between cursor-pointer rounded p-2 text-left text-sm transition-colors hover:text-accent"
                    style={{ color: 'var(--ctp-text)' }}
                  >
                    <span>Language / Bahasa:</span>
                    <span className="font-mono text-xs font-bold text-accent">
                      {lang === 'en' ? 'English (EN)' : 'Indonesia (ID)'}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};
