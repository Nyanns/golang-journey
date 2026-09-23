import React from 'react';
import { BookOpen, ArrowUpRight, Clock, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const WritingSection = () => {
  const { articles } = portfolioData;

  return (
    <section id="writing" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-rose-500 mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Technical Writing & Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Publications & Engineering Notes
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Technical breakdowns of Go backend patterns, cybersecurity wargame lessons, and system architecture.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {articles.map((article) => {
            const isClickable = !article.isUpcoming;
            const CardWrapper = isClickable ? 'a' : 'div';
            const wrapperProps = isClickable
              ? {
                  href: article.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {};

            return (
              <CardWrapper
                key={article.title}
                {...wrapperProps}
                className={`group bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between transition-all shadow-xs ${
                  isClickable
                    ? 'hover:border-rose-500/40 hover:-translate-y-0.5 cursor-pointer'
                    : 'opacity-85 border-dashed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        {article.platform}
                      </span>
                      {article.isUpcoming && (
                        <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>Draft / Upcoming</span>
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-slate-400">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {article.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {isClickable && (
                    <span className="text-xs font-mono font-semibold text-rose-500 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
                      <span>Read</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
};
