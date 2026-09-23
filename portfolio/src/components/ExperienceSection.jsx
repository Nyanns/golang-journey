import React from 'react';
import { Briefcase, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ExperienceSection = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career History</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Professional Experience
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Hands-on technical roles in government IT infrastructure and competitive tech cohorts.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experience.map((item) => (
            <div
              key={item.company}
              className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <span className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400">
                    {item.company}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
              </div>

              <ul className="space-y-2.5 my-4">
                {item.highlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
