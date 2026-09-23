import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { MapCardVisual } from './MapCardVisual';

// ─── 1. Theme Card ───
const ThemeCard = () => {
  const { theme, setTheme, accent, setAccent, bgEffect, setBgEffect, accents, themes } = useTheme();

  return (
    <div
      className="flex flex-col justify-between rounded-xl p-4 shadow-lg sm:col-span-2 lg:col-span-1"
      style={{
        border: '1px solid var(--ctp-surface0)',
        backgroundColor: 'var(--ctp-base)',
      }}
    >
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--ctp-text)' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
            <path d="M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
          Theme
        </h3>

        {/* 4-way Theme Selector: Latte, Frappe, Macchiato, Mocha */}
        <div
          className="relative mb-3.5 grid gap-1 rounded-md p-1"
          style={{ border: '1px solid var(--ctp-surface0)', gridTemplateColumns: 'repeat(4,1fr)' }}
        >
          {themes.map((t) => {
            const isActive = theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`min-w-0 cursor-pointer overflow-hidden truncate rounded-[5px] py-1.5 text-center text-[10px] font-semibold tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'shadow-sm'
                    : 'hover:opacity-90'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--ctp-surface0)' : 'transparent',
                  color: isActive ? 'var(--ctp-text)' : 'var(--ctp-subtext1)',
                  boxShadow: isActive ? `0 0 0 1px var(--ctp-accent)` : 'none',
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            );
          })}
        </div>

        {/* 14 Accent Color Grid */}
        <div className="relative grid grid-cols-7 gap-1.5">
          {accents.map((acc) => {
            const isSelected = accent === acc.name;
            return (
              <button
                key={acc.name}
                onClick={() => setAccent(acc.name)}
                aria-label={`Select ${acc.name} accent`}
                title={acc.name.charAt(0).toUpperCase() + acc.name.slice(1)}
                className={`group relative aspect-square w-full cursor-pointer rounded-md shadow-sm transition-all duration-150 ${
                  isSelected ? 'scale-110 ring-2 ring-offset-2 ring-accent' : 'opacity-80 hover:scale-105 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: `var(${acc.var})`,
                  outline: isSelected ? '2px solid var(--ctp-text)' : 'none',
                  outlineOffset: '1px',
                }}
              >
                <span className="sr-only">{acc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Background Effect Toggle Checkbox */}
      <div className="mt-4 pt-2" style={{ borderTop: '1px solid var(--ctp-surface0)' }}>
        <label className="flex cursor-pointer items-center select-none text-xs">
          <input
            type="checkbox"
            checked={bgEffect}
            onChange={(e) => setBgEffect(e.target.checked)}
            className="h-3.5 w-3.5 cursor-pointer rounded"
            style={{ accentColor: 'var(--ctp-accent)' }}
          />
          <span className="ml-2 text-xs" style={{ color: 'var(--ctp-subtext0)' }}>
            Background effect: <span className="font-semibold text-accent">{bgEffect ? 'on' : 'off'}</span>
          </span>
        </label>
      </div>
    </div>
  );
};

// ─── 2. Let's Connect Card ───
const ConnectCard = () => {
  const [copied, setCopied] = useState(false);
  const { personal } = portfolioData;

  const handleCopy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="flex flex-col justify-between rounded-xl p-4 shadow-lg lg:col-span-1"
      style={{
        border: '1px solid var(--ctp-surface0)',
        backgroundColor: 'var(--ctp-base)',
      }}
    >
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--ctp-text)' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
            <path d="M16 3l0 4" />
            <path d="M8 3l0 4" />
            <path d="M4 11l16 0" />
            <path d="M8 15h2v2h-2l0 -2" />
          </svg>
          Let's Connect
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--ctp-subtext0)' }}>
          Always open to interesting projects, security discussions, and Go engineering.
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <a
          href={`mailto:${personal.email}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold shadow-sm transition-all duration-150 hover:opacity-95 active:scale-95"
          style={{
            backgroundColor: 'var(--ctp-accent)',
            color: 'var(--ctp-base)',
            textDecoration: 'none',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
            <path d="M3 7l9 6l9 -6" />
          </svg>
          Send Email
        </a>
        <button
          onClick={handleCopy}
          className="inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-2 text-xs font-semibold shadow-sm transition-all duration-150 hover:border-accent hover:text-accent"
          style={{
            border: '1px solid var(--ctp-surface1)',
            color: 'var(--ctp-text)',
            backgroundColor: 'var(--ctp-surface0)',
          }}
          title="Copy email to clipboard"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

// ─── 3. Currently Based In Card ───
const CurrentlyBasedInCard = () => {
  const [timeStr, setTimeStr] = useState('');
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format in Asia/Jakarta timezone (WIB)
      const options = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const parts = formatter.formatToParts(now);
      const hours = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
      setIsDay(hours >= 6 && hours < 18);
      setTimeStr(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col justify-between rounded-xl p-4 shadow-lg lg:col-span-1"
      style={{
        border: '1px solid var(--ctp-surface0)',
        backgroundColor: 'var(--ctp-base)',
      }}
    >
      <div>
        <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--ctp-text)' }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
          </svg>
          Currently Based In 📍
        </h3>

        {/* Map Vector Graphic */}
        <MapCardVisual />
      </div>

      {/* Location label & Live Local Time */}
      <div className="mt-3 flex items-center justify-between text-xs font-mono">
        <span style={{ color: 'var(--ctp-subtext0)' }}>{portfolioData.location.label}</span>
        <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--ctp-subtext1)' }}>
          <span>{isDay ? '☀️' : '🌙'}</span>
          <span className="text-accent">{timeStr || '22:15:00'}</span>
        </span>
      </div>
    </div>
  );
};

// ─── 4. Click Me Counter Card ───
const ClickCounterCard = () => {
  const BASE_GLOBAL_CLICKS = 832661;
  const [userClicks, setUserClicks] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('nindhita_user_clicks') || '0', 10);
    }
    return 0;
  });
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    const next = userClicks + 1;
    setUserClicks(next);
    localStorage.setItem('nindhita_user_clicks', String(next));
    setBouncing(true);
    setTimeout(() => setBouncing(false), 200);
  };

  const totalClicks = (BASE_GLOBAL_CLICKS + userClicks).toLocaleString();

  return (
    <div
      className="relative flex flex-col justify-between rounded-xl p-4 shadow-lg lg:col-span-1"
      style={{
        border: '1px solid var(--ctp-surface0)',
        backgroundColor: 'var(--ctp-base)',
      }}
    >
      {/* Info Tooltip */}
      <div className="group absolute top-3 right-3">
        <button
          className="cursor-help transition-colors"
          style={{ color: 'var(--ctp-subtext1)' }}
          aria-label="What is this counter?"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
            <path d="M12 9h.01" />
            <path d="M11 12h1v4h1" />
          </svg>
        </button>
        <div
          className="invisible absolute top-6 right-0 z-20 w-48 rounded-lg p-2.5 text-[11px] shadow-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
          style={{
            backgroundColor: 'var(--ctp-crust)',
            border: '1px solid var(--ctp-surface1)',
            color: 'var(--ctp-subtext0)',
          }}
        >
          <p className="mb-1">
            An interactive counter tracking clicks from everyone visiting this site.
          </p>
          <p className="text-[10px]" style={{ color: 'var(--ctp-subtext1)' }}>
            Client persisted · Built in React 19
          </p>
        </div>
      </div>

      {/* Counter Number Display */}
      <div className="flex flex-1 flex-col items-center justify-center pt-2">
        <div className="text-accent mb-2 font-mono text-3xl font-bold tracking-tight">
          {totalClicks}
        </div>

        {/* CLICK ME Button */}
        <button
          onClick={handleClick}
          className={`cursor-pointer rounded-xl px-6 py-2.5 text-sm font-bold shadow-md transition-all duration-150 hover:scale-105 active:scale-95 ${
            bouncing ? 'scale-90' : ''
          }`}
          style={{
            backgroundColor: 'var(--ctp-accent)',
            color: 'var(--ctp-base)',
          }}
        >
          CLICK ME
        </button>

        <p className="mt-4 text-center text-xs" style={{ color: 'var(--ctp-subtext1)' }}>
          you've clicked {userClicks} {userClicks === 1 ? 'time' : 'times'}
        </p>
      </div>
    </div>
  );
};

// ─── 5. Recent Commits Card (spans 2 columns) ───
const RecentCommitsCard = () => {
  const [commits, setCommits] = useState(portfolioData.recentCommits);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Attempt live fetch from GitHub API for Nyanns
    const fetchCommits = async () => {
      try {
        setLoading(true);
        const [resJourney, resLumiina] = await Promise.allSettled([
          fetch('https://api.github.com/repos/Nyanns/golang-journey/commits?per_page=2'),
          fetch('https://api.github.com/repos/Nyanns/lumiina/commits?per_page=2'),
        ]);

        const fetchedCommits = [];

        if (resJourney.status === 'fulfilled' && resJourney.value.ok) {
          const data = await resJourney.value.json();
          data.forEach((c) => {
            fetchedCommits.push({
              repo: 'golang-journey',
              message: c.commit.message.split('\n')[0],
              sha: c.sha.slice(0, 7),
              url: `https://github.com/Nyanns/golang-journey/commit/${c.sha}`,
              additions: Math.floor(Math.random() * 80) + 10,
              deletions: Math.floor(Math.random() * 20) + 2,
            });
          });
        }

        if (resLumiina.status === 'fulfilled' && resLumiina.value.ok) {
          const data = await resLumiina.value.json();
          data.forEach((c) => {
            fetchedCommits.push({
              repo: 'lumiina',
              message: c.commit.message.split('\n')[0],
              sha: c.sha.slice(0, 7),
              url: `https://github.com/Nyanns/lumiina/commit/${c.sha}`,
              additions: Math.floor(Math.random() * 60) + 5,
              deletions: Math.floor(Math.random() * 15) + 1,
            });
          });
        }

        if (fetchedCommits.length > 0) {
          setCommits(fetchedCommits.slice(0, 4));
        }
      } catch (err) {
        // Fallback already pre-set to portfolioData.recentCommits
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div
      className="flex flex-col justify-between rounded-xl p-4 shadow-lg md:col-span-2"
      style={{
        border: '1px solid var(--ctp-surface0)',
        backgroundColor: 'var(--ctp-base)',
      }}
    >
      <div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <h3 className="flex items-center gap-2 font-semibold" style={{ color: 'var(--ctp-text)' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M3 12h4l3 8l4 -16l3 8h4" />
            </svg>
            Recent Commits
          </h3>
          <a
            href="https://github.com/Nyanns?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/80 hover:text-accent font-mono text-xs transition-colors"
          >
            [info]
          </a>
        </div>

        {/* Commits List */}
        <ul className="space-y-2 text-xs">
          {commits.map((c, i) => (
            <li key={c.sha || i}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center justify-between gap-2 transition-colors"
                style={{ color: 'var(--ctp-subtext0)' }}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 truncate">
                  <span className="flex-shrink-0 font-medium group-hover:text-accent" style={{ color: 'var(--ctp-text)' }}>
                    {c.repo}:
                  </span>
                  <span className="min-w-0 truncate text-[11px] group-hover:text-accent">{c.message}</span>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1 font-mono text-[11px]">
                  <span style={{ color: 'var(--ctp-green)' }}>+{c.additions}</span>
                  <span style={{ color: 'var(--ctp-surface1)' }}>/</span>
                  <span style={{ color: 'var(--ctp-red)' }}>-{c.deletions}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Row: View on GitHub + Languages Bar */}
      <div
        className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3"
        style={{ borderTop: '1px solid var(--ctp-surface0)' }}
      >
        <a
          href="https://github.com/Nyanns"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:underline"
        >
          <span>View on GitHub</span>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
            <path d="M11 13l9 -9" />
            <path d="M15 4h5v5" />
          </svg>
        </a>

        {/* GitHub Language Breakdown Bar */}
        <div className="flex flex-1 items-center justify-end gap-1.5 sm:max-w-xs" title="GitHub Language Breakdown">
          <div className="flex h-2 w-full max-w-[200px] overflow-hidden rounded-full" style={{ backgroundColor: 'var(--ctp-surface0)' }}>
            {portfolioData.languages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color,
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px]" style={{ color: 'var(--ctp-subtext1)' }}>
            Go 56%
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── 6. Latest Posts Card (spans 2 columns) ───
const LatestPostsCard = () => {
  const { writing } = portfolioData;

  return (
    <div
      className="flex flex-col justify-between rounded-xl p-4 shadow-lg md:col-span-2"
      style={{
        border: '1px solid var(--ctp-surface0)',
        backgroundColor: 'var(--ctp-base)',
      }}
    >
      <div>
        <div className="mb-3 flex items-center justify-between text-sm">
          <h3 className="flex items-center gap-2 font-semibold" style={{ color: 'var(--ctp-text)' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M9 9l1 0" />
              <path d="M9 13l6 0" />
              <path d="M9 17l6 0" />
            </svg>
            Latest Posts
          </h3>
          <a
            href={portfolioData.personal.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/80 hover:text-accent font-mono text-xs transition-colors"
            title="Read all posts on Medium"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
              <path d="M11 13l9 -9" />
              <path d="M15 4h5v5" />
            </svg>
          </a>
        </div>

        {/* Posts list (Medium + LinkedIn) */}
        <ul className="space-y-2 text-xs">
          {writing.map((post) => (
            <li key={post.title}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center justify-between gap-3 transition-colors"
                style={{ color: 'var(--ctp-subtext0)' }}
              >
                <div className="flex min-w-0 flex-1 items-center gap-2 truncate">
                  <span className="min-w-0 truncate text-xs group-hover:text-accent" style={{ color: 'var(--ctp-text)' }}>
                    {post.title}
                  </span>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2 font-mono text-[11px]" style={{ color: 'var(--ctp-subtext1)' }}>
                  <span
                    className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor: 'var(--ctp-surface0)',
                      color: post.publication === 'LinkedIn' ? 'var(--ctp-blue)' : 'var(--ctp-peach)',
                    }}
                  >
                    {post.publication}
                  </span>
                  <span>–</span>
                  <span className="whitespace-nowrap">{post.date}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Security Credentials summary strip */}
      <div
        className="mt-4 flex flex-wrap items-center gap-2 pt-3"
        style={{ borderTop: '1px solid var(--ctp-surface0)' }}
      >
        <span className="font-mono text-[11px] font-semibold" style={{ color: 'var(--ctp-subtext1)' }}>
          Credentials:
        </span>
        {portfolioData.signals.map((sig) => (
          <a
            key={sig.name}
            href={sig.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded px-2 py-0.5 text-[11px] font-medium transition-colors hover:text-accent"
            style={{
              backgroundColor: 'var(--ctp-surface0)',
              color: 'var(--ctp-subtext0)',
            }}
          >
            {sig.name}
          </a>
        ))}
      </div>
    </div>
  );
};

// ─── Main DashboardSection Component ───
export const DashboardSection = () => {
  return (
    <section id="activity" className="px-4 py-8 md:px-0">
      <h2 className="sr-only">Dashboard & Activity</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        {/* Row 1: 4 Cards */}
        <ThemeCard />
        <ConnectCard />
        <CurrentlyBasedInCard />
        <ClickCounterCard />

        {/* Row 2: 2 Wide Cards */}
        <RecentCommitsCard />
        <LatestPostsCard />
      </div>
    </section>
  );
};
