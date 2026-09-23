import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-accent"
    style={{ color: 'var(--ctp-subtext1)' }}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const Separator = () => (
  <span className="text-xs" style={{ color: 'var(--ctp-surface1)' }}>|</span>
);

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const { data, t } = useLanguage();
  const { personal } = data;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="space-y-5 px-4 md:px-0">
      {/* Main Title */}
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl" style={{ color: 'var(--ctp-text)' }}>
        {personal.name}
      </h1>

      {/* Role subtitle */}
      <p className="font-mono text-sm" style={{ color: 'var(--ctp-accent)' }}>
        {personal.role}
      </p>

      <p
        className="max-w-prose text-base leading-relaxed md:text-lg"
        style={{ color: 'var(--ctp-subtext0)' }}
      >
        {personal.intro}
      </p>

      <p
        className="max-w-prose text-sm leading-relaxed"
        style={{ color: 'var(--ctp-overlay1)' }}
      >
        {personal.status}
      </p>

      {/* Social links row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
        <SocialLink
          href={personal.links.github}
          label="GitHub"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
            </svg>
          }
        />
        <Separator />
        <SocialLink
          href={personal.links.linkedin}
          label="LinkedIn"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" />
              <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
            </svg>
          }
        />
        <Separator />
        <SocialLink
          href={personal.links.hackthebox}
          label="HackTheBox"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12v9" /><path d="M12 12l-8 -4.5" />
            </svg>
          }
        />
        <Separator />
        <SocialLink
          href={personal.links.medium}
          label="Medium"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5a2.5 2.5 0 0 1 2.5 -2.5h11a2.5 2.5 0 0 1 2.5 2.5" />
              <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2z" />
              <path d="M9 8h6" /><path d="M9 12h6" />
            </svg>
          }
        />
        <Separator />
        <SocialLink
          href={personal.links.leetcode}
          label="LeetCode"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 13h7.5" /><path d="M9.424 7.268l4.999 -4.999" /><path d="M16.633 16.644l-2.402 2.415a3.189 3.189 0 0 1 -4.524 0l-3.77 -3.787a3.223 3.223 0 0 1 0 -4.544l3.77 -3.787a3.189 3.189 0 0 1 4.524 0" />
            </svg>
          }
        />
        <Separator />
        <a
          href={`mailto:${personal.email}`}
          className="group inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-accent"
          style={{ color: 'var(--ctp-subtext1)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
            <path d="M3 7l9 6l9 -6" />
          </svg>
          <span>Email</span>
        </a>
      </div>
    </section>
  );
};
