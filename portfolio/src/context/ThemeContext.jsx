import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ACCENTS = [
  { name: 'rosewater', var: '--ctp-rosewater' },
  { name: 'flamingo', var: '--ctp-flamingo' },
  { name: 'pink', var: '--ctp-pink' },
  { name: 'mauve', var: '--ctp-mauve' },
  { name: 'red', var: '--ctp-red' },
  { name: 'maroon', var: '--ctp-maroon' },
  { name: 'peach', var: '--ctp-peach' },
  { name: 'yellow', var: '--ctp-yellow' },
  { name: 'green', var: '--ctp-green' },
  { name: 'teal', var: '--ctp-teal' },
  { name: 'sky', var: '--ctp-sky' },
  { name: 'sapphire', var: '--ctp-sapphire' },
  { name: 'blue', var: '--ctp-blue' },
  { name: 'lavender', var: '--ctp-lavender' },
];

export const THEMES = ['latte', 'frappe', 'macchiato', 'mocha'];

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nindhita_theme') || 'mocha';
    }
    return 'mocha';
  });

  const [accent, setAccentState] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nindhita_accent') || 'peach';
    }
    return 'peach';
  });

  const [bgEffect, setBgEffectState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nindhita_bg_effect');
      return stored !== null ? stored === 'true' : true; // default true for cool aesthetic!
    }
    return true;
  });

  const setTheme = (newTheme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('latte', 'frappe', 'macchiato', 'mocha');
      document.documentElement.classList.add(newTheme);
      localStorage.setItem('nindhita_theme', newTheme);
    }
    setThemeState(newTheme);
  };

  const setAccent = (newAccent) => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--ctp-accent', `var(--ctp-${newAccent})`);
      localStorage.setItem('nindhita_accent', newAccent);
    }
    setAccentState(newAccent);
  };

  const setBgEffect = (val) => {
    const nextVal = typeof val === 'function' ? val(bgEffect) : val;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('nindhita_bg_effect', String(nextVal));
    }
    setBgEffectState(nextVal);
  };

  // Sync initial on mount
  useEffect(() => {
    setTheme(theme);
    setAccent(accent);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        accent,
        setAccent,
        bgEffect,
        setBgEffect,
        accents: ACCENTS,
        themes: THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
