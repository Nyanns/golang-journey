import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  ShieldAlert, 
  Mail, 
  Copy, 
  Check, 
  ArrowUp, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const { personal } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 md:py-24 bg-white dark:bg-[#06080d] border-t border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Contact Banner */}
        <div className="bg-slate-50 dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 mb-12 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Channel</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-xl">
            Let's Engineer Something Solid Together.
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mt-3 leading-relaxed">
            Open to discussing high-concurrency Go backend systems, defense-in-depth API security architecture, or automated SDET testing pipelines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : personal.email}</span>
            </button>
          </div>
        </div>

        {/* Footer Meta & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
          
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
              {personal.brand}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} {personal.name}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={personal.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-500 transition-colors"
              aria-label="LeetCode Profile"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={personal.links.hackthebox}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
              aria-label="HackTheBox Profile"
            >
              <ShieldAlert className="w-4 h-4" />
            </a>
            <a
              href={personal.links.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-500 transition-colors"
              aria-label="Medium Publications"
            >
              <BookOpen className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors ml-2 cursor-pointer"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Technical Subtext */}
        <div className="mt-6 text-center sm:text-left">
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            Engineered with React 19 + Vite 8 + TailwindCSS v4 • Deployed on Vercel Anycast Edge
          </p>
        </div>

      </div>
    </footer>
  );
};
