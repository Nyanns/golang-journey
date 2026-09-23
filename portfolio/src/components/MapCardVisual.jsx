import React from 'react';

export const MapCardVisual = () => {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg bg-[var(--ctp-crust)] shadow-inner">
      {/* SVG stylized map vector with street lines and contours */}
      <svg
        className="absolute inset-0 h-full w-full opacity-60 dark:opacity-40 transition-opacity"
        viewBox="0 0 300 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* River curve */}
        <path
          d="M 120 -10 Q 140 40 130 80 T 160 130"
          stroke="var(--ctp-surface1)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Ring Road and Major Arterials */}
        <ellipse
          cx="150"
          cy="60"
          rx="110"
          ry="45"
          stroke="var(--ctp-surface1)"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
        <path
          d="M -10 60 L 310 60"
          stroke="var(--ctp-surface1)"
          strokeWidth="3"
        />
        <path
          d="M 150 -10 L 150 130"
          stroke="var(--ctp-surface1)"
          strokeWidth="3"
        />

        {/* Secondary street grid */}
        <path d="M 30 10 L 110 110" stroke="var(--ctp-surface0)" strokeWidth="1.5" />
        <path d="M 70 0 L 170 120" stroke="var(--ctp-surface0)" strokeWidth="1" />
        <path d="M 210 0 L 270 120" stroke="var(--ctp-surface0)" strokeWidth="1.5" />
        <path d="M 0 30 L 300 30" stroke="var(--ctp-surface0)" strokeWidth="1" />
        <path d="M 0 90 L 300 90" stroke="var(--ctp-surface0)" strokeWidth="1" />
        <path d="M 90 20 L 210 20" stroke="var(--ctp-surface0)" strokeWidth="1" />
        <path d="M 90 100 L 210 100" stroke="var(--ctp-surface0)" strokeWidth="1" />
        <path d="M 180 10 L 290 80" stroke="var(--ctp-surface0)" strokeWidth="1" />
        <path d="M 20 80 L 100 120" stroke="var(--ctp-surface0)" strokeWidth="1" />

        {/* City Blocks fill accents */}
        <rect x="100" y="36" width="30" height="18" fill="var(--ctp-surface0)" rx="2" opacity="0.6" />
        <rect x="165" y="38" width="40" height="16" fill="var(--ctp-surface0)" rx="2" opacity="0.6" />
        <rect x="105" y="68" width="35" height="16" fill="var(--ctp-surface0)" rx="2" opacity="0.6" />
        <rect x="165" y="68" width="28" height="18" fill="var(--ctp-surface0)" rx="2" opacity="0.6" />
      </svg>

      {/* Subdued City Name Watermark (just like TORONTO in jasoncameron.dev) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="select-none font-mono text-xl font-black tracking-[0.3em] uppercase opacity-35"
          style={{ color: 'var(--ctp-subtext0)' }}
        >
          YOGYAKARTA
        </span>
      </div>

      {/* Pulsing Pin Marker at Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute h-6 w-6 animate-ping rounded-full opacity-60" style={{ backgroundColor: 'var(--ctp-red)' }} />
          <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full shadow-md" style={{ backgroundColor: 'var(--ctp-red)' }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
        </div>
      </div>

      {/* Coordinates watermark overlay */}
      <div className="pointer-events-none absolute bottom-1 right-2 font-mono text-[9px] opacity-40" style={{ color: 'var(--ctp-overlay1)' }}>
        7.7956° S, 110.3695° E
      </div>
    </div>
  );
};
