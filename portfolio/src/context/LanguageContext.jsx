import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPortfolioData } from '../data/portfolioData';

const LanguageContext = createContext();

export const UI_TRANSLATIONS = {
  en: {
    // Navigation
    'nav.projects': 'Projects',
    'nav.stack': 'Stack',
    'nav.activity': 'Activity',
    'nav.experience': 'Experience',
    'nav.resume': 'Resume',
    'nav.home': 'Home',
    'nav.toggleTheme': 'Toggle light or dark theme',
    'nav.switchLang': 'Switch to Indonesian',
    'nav.typewriter': ['nindhita.xyz', 'backend engineer', 'go developer', 'qa automation', 'cybersecurity'],

    // Hero Section
    'hero.copied': 'Copied!',
    'hero.copyEmail': 'Copy email address',
    'hero.email': 'Email',

    // Work Section
    'work.featured': 'Featured Projects',
    'work.allRepos': 'All repositories',
    'work.liveDemo': 'Live Demo',
    'work.source': 'Source',
    'work.keyArchitecture': 'Key Architecture & Highlights:',

    // Stack Section
    'stack.title': 'Skills & Technologies',

    // Dashboard Section
    'dash.title': 'Activity & Preferences',
    'dash.themeTitle': 'Theme Customizer',
    'dash.themeDesc': 'Catppuccin colorway palette & primary accent engine.',
    'dash.bgTitle': 'Atmospheric Background',
    'dash.bgDesc': 'Ethereal aurora drift & neural constellation starfield.',
    'dash.bgOn': 'Active',
    'dash.bgOff': 'Off',
    'dash.basedTitle': 'Currently Based In 📍',
    'dash.localTime': 'Local Time',
    'dash.counterTitle': 'Global Click Counter',
    'dash.clickMe': 'CLICK ME',
    'dash.clickedTimes': "you've clicked {n} {unit}",
    'dash.unitSingular': 'time',
    'dash.unitPlural': 'times',
    'dash.counterTooltip': 'An interactive counter tracking clicks from everyone visiting this site.',
    'dash.connectTitle': "Let's Connect",
    'dash.connectDesc': 'Always open to interesting projects, security discussions, and Go engineering.',
    'dash.sendEmail': 'Send Email',
    'dash.copy': 'Copy',
    'dash.copied': 'Copied!',
    'dash.commitsTitle': 'Recent Commits',
    'dash.viewGitHub': 'View on GitHub',
    'dash.postsTitle': 'Latest Posts',
    'dash.credentials': 'Credentials:',
    'dash.langTitle': 'Display Language',
    'dash.langDesc': 'Switch interface between English and Bahasa Indonesia.',

    // Experience Section
    'exp.title': 'Experience',

    // Footer
    'footer.nominal': 'All Services Nominal',
    'footer.views': 'views',
    'footer.timerTooltip': 'How long you have been surfing my site',
    'footer.network': 'Network:',
    'footer.latestCommit': 'View latest deployment commit',
  },
  id: {
    // Navigation
    'nav.projects': 'Proyek',
    'nav.stack': 'Keahlian',
    'nav.activity': 'Aktivitas',
    'nav.experience': 'Pengalaman',
    'nav.resume': 'Resume',
    'nav.home': 'Beranda',
    'nav.toggleTheme': 'Ganti mode terang atau gelap',
    'nav.switchLang': 'Ganti ke Bahasa Inggris',
    'nav.typewriter': ['nindhita.xyz', 'backend engineer', 'pengembang go', 'otomasi qa', 'keamanan siber'],

    // Hero Section
    'hero.copied': 'Tersalin!',
    'hero.copyEmail': 'Salin alamat email',
    'hero.email': 'Email',

    // Work Section
    'work.featured': 'Proyek Unggulan',
    'work.allRepos': 'Semua repositori',
    'work.liveDemo': 'Lihat Live',
    'work.source': 'Kode Sumber',
    'work.keyArchitecture': 'Sorotan Arsitektur Utama:',

    // Stack Section
    'stack.title': 'Keahlian & Teknologi',

    // Dashboard Section
    'dash.title': 'Aktivitas & Preferensi',
    'dash.themeTitle': 'Kustomisasi Tema',
    'dash.themeDesc': 'Palet warna Catppuccin & aksen sistem interaktif.',
    'dash.bgTitle': 'Efek Latar Partikel',
    'dash.bgDesc': 'Aurora kosmik halus & konstelasi bintang interaktif.',
    'dash.bgOn': 'Aktif',
    'dash.bgOff': 'Nonaktif',
    'dash.basedTitle': 'Lokasi Saat Ini 📍',
    'dash.localTime': 'Waktu Lokal',
    'dash.counterTitle': 'Penghitung Klik Global',
    'dash.clickMe': 'KLIK SAYA',
    'dash.clickedTimes': 'kamu telah mengklik {n} {unit}',
    'dash.unitSingular': 'kali',
    'dash.unitPlural': 'kali',
    'dash.counterTooltip': 'Penghitung interaktif yang mencatat klik dari seluruh pengunjung situs ini.',
    'dash.counterFooter': 'Tersimpan lokal · Dibangun dengan React 19',
    'dash.connectTitle': 'Mari Terhubung',
    'dash.connectDesc': 'Terbuka untuk kolaborasi proyek menarik, diskusi keamanan sistem, dan rekayasa Go.',
    'dash.sendEmail': 'Kirim Email',
    'dash.copy': 'Salin',
    'dash.copied': 'Tersalin!',
    'dash.commitsTitle': 'Commit Terkini',
    'dash.viewGitHub': 'Lihat di GitHub',
    'dash.postsTitle': 'Tulisan Terbaru',
    'dash.credentials': 'Kredensial:',
    'dash.langTitle': 'Bahasa Tampilan',
    'dash.langDesc': 'Pilih antarmuka antara Bahasa Inggris dan Bahasa Indonesia.',

    // Experience Section
    'exp.title': 'Pengalaman Kerja',

    // Footer
    'footer.nominal': 'Semua Sistem Normal',
    'footer.views': 'tayangan',
    'footer.timerTooltip': 'Lama waktu kamu berkunjung di situs ini',
    'footer.network': 'Jaringan:',
    'footer.latestCommit': 'Lihat commit deploy terakhir',
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('nindhita_lang');
      return stored === 'id' ? 'id' : 'en'; // default English
    }
    return 'en';
  });

  const setLang = (newLang) => {
    const valid = newLang === 'id' ? 'id' : 'en';
    if (typeof window !== 'undefined') {
      localStorage.setItem('nindhita_lang', valid);
      document.documentElement.lang = valid;
    }
    setLangState(valid);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'id' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key, fallback = '') => {
    return UI_TRANSLATIONS[lang]?.[key] ?? UI_TRANSLATIONS.en?.[key] ?? fallback ?? key;
  };

  const data = getPortfolioData(lang);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t,
        data,
        isId: lang === 'id',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
