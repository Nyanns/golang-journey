import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const { personal, focusAreas } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="space-y-6">
        
        {/* Availability line */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for Backend, Security & SDET Roles</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {personal.name}
          </h1>
          <p className="text-sm font-mono text-zinc-500 dark:text-zinc-400">
            {personal.title}
          </p>
        </div>

        {/* Concise Bio */}
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
          {personal.intro}
        </p>

        {/* Minimal Social & Contact Links */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-0.5"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-0.5"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <a
            href={personal.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-0.5"
          >
            <span>LeetCode</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <a
            href={personal.links.hackthebox}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-0.5"
          >
            <span>HackTheBox</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <a
            href={personal.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-0.5"
          >
            <span>Medium</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <span>/</span>
          <button
            onClick={handleCopyEmail}
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <span className="text-emerald-500 font-semibold">Copied!</span>
            ) : (
              <span>Email</span>
            )}
          </button>
        </div>

        {/* 3 Core Competence Lines */}
        <div className="pt-6 space-y-3">
          {focusAreas.map((area) => (
            <div key={area.title} className="text-xs leading-relaxed">
              <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                {area.title}:{' '}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">
                {area.desc}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
