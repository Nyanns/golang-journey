import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="py-16 text-xs text-zinc-500 dark:text-zinc-400">
      <div className="space-y-6">
        
        {/* Contact Note */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Get in touch
          </p>
          <p className="text-xs leading-relaxed max-w-md">
            Open to discussing Go backend microservices, API defense-in-depth architectures, or automated SDET pipelines.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={`mailto:${personal.email}`}
              className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 hover:underline"
            >
              {personal.email}
            </a>
            <button
              onClick={handleCopyEmail}
              className="text-[11px] font-mono hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              {copied ? <span className="text-emerald-500 font-semibold">Copied!</span> : '[copy]'}
            </button>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>{personal.brand}</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} {personal.name}</span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400">
            <a
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personal.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              LeetCode
            </a>
            <a
              href={personal.links.hackthebox}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              HackTheBox
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
