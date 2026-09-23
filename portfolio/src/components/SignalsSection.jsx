import React from 'react';
import { 
  Code2, 
  ShieldAlert, 
  Award, 
  ExternalLink, 
  ArrowUpRight, 
  CheckCircle2, 
  Hash, 
  Terminal,
  Cpu
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SignalsSection = () => {
  const { signals } = portfolioData;

  return (
    <section id="signals" className="py-16 md:py-24 border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Verifiable Competence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineering Signals & Credentials
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Auditable problem-solving metrics, cybersecurity assessments, and professional technical certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* LeetCode Algorithmic Solving Card */}
          <div className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Code2 className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      LeetCode Problem Solving
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      @{signals.leetcode.username}
                    </span>
                  </div>
                </div>

                <a
                  href={signals.leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="bg-slate-50 dark:bg-[#12151e] border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Total Solved
                  </span>
                  <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white block mt-0.5">
                    {signals.leetcode.totalSolved}
                  </span>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    Easy
                  </span>
                  <span className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5">
                    {signals.leetcode.breakdown.easy}
                  </span>
                </div>

                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                    Medium
                  </span>
                  <span className="text-xl font-mono font-extrabold text-amber-600 dark:text-amber-400 block mt-0.5">
                    {signals.leetcode.breakdown.medium}
                  </span>
                </div>
              </div>

              {/* Topics Breakdown */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                  Top Algorithmic Domains
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {signals.leetcode.topTopics.map((topic) => (
                    <span
                      key={topic}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Languages: {signals.leetcode.languages.join(' • ')}</span>
            </div>
          </div>

          {/* HackTheBox & Security Mindset Card */}
          <div className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <ShieldAlert className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Hack The Box Profile
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      @{signals.hackthebox.username}
                    </span>
                  </div>
                </div>

                <a
                  href={signals.hackthebox.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <span>Verify Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 my-3">
                <p className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                  {signals.hackthebox.highlight}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Practical red-team and defensive mindset applied directly into backend development: threat modeling, Linux command-line forensics, and defensive code audits.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                  Security Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {signals.hackthebox.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>OWASP API Security Top 10 • Zero-Leakage Mindset</span>
            </div>
          </div>

        </div>

        {/* Verified Professional Certifications Shelf */}
        <div className="bg-white dark:bg-[#0c0f16] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Award className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-mono font-bold tracking-tight text-slate-900 dark:text-white uppercase">
              Verified Certifications & Honors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {signals.certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-slate-50 dark:bg-[#12151e] border border-slate-200/80 dark:border-slate-800/80 hover:border-sky-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                      {cert.score}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {cert.date}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                    {cert.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                    {cert.issuer}
                  </span>

                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 group-hover:text-sky-500 pt-3 mt-3 border-t border-slate-200/60 dark:border-slate-800/60 transition-colors">
                  <span>Verify Credential</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
