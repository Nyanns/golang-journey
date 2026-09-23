import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SignalsWritingSection = () => {
  const { signals, writing } = portfolioData;

  return (
    <section id="writing" className="py-12 sm:py-16 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="space-y-12">
        
        {/* Writing Subsection */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Writing
            </h2>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Technical Publications
            </p>
          </div>

          <div className="space-y-3">
            {writing.map((post) => (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-2 border-b border-zinc-100 dark:border-zinc-800/40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {post.title}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                  {post.date}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Signals Subsection (LeetCode & HackTheBox) */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Verification Signals
            </h2>
            <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Problem Solving & Security
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {signals.map((sig) => (
              <a
                key={sig.platform}
                href={sig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors bg-white dark:bg-[#0c0f16]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                    {sig.platform}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
                </div>
                <p className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 mt-1">
                  {sig.metric}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {sig.detail}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
