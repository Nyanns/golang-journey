import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  ShieldAlert, 
  Mail, 
  Copy, 
  Check, 
  ArrowDown, 
  ExternalLink,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Server
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export const HeroSection = () => {
  const [copied, setCopied] = useState(false);
  const { personal, roles } = portfolioData;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const roleIcons = {
    "Backend Systems Engineer": Server,
    "Cybersecurity Practitioner": ShieldCheck,
    "QA Automation Engineer": CheckCircle2,
  };

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-6 animate-in fade-in duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{personal.availability}</span>
        </div>

        {/* Hero Title & Bio */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {personal.name}
          </h1>

          <p className="text-base sm:text-xl font-medium text-sky-600 dark:text-sky-400 font-mono tracking-tight">
            {personal.tagline}
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl pt-2">
            {personal.summary}
          </p>
        </div>

        {/* Social & Action Dock */}
        <div className="flex flex-wrap items-center gap-3 pt-8">
          <a
            href={personal.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 shadow-xs"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={personal.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 shadow-xs"
          >
            <LinkedinIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personal.links.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 shadow-xs"
          >
            <Code2 className="w-4 h-4 text-amber-500" />
            <span>LeetCode</span>
          </a>

          <a
            href={personal.links.hackthebox}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 shadow-xs"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-500" />
            <span>HackTheBox</span>
          </a>

          <a
            href={personal.links.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>Medium</span>
          </a>

          {/* Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
          </button>
        </div>

        {/* 3 Core Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
          {roles.map((role) => {
            const Icon = roleIcons[role.title] || Terminal;
            return (
              <div
                key={role.title}
                className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 hover:border-sky-500/40 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80">
                    {role.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {role.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
