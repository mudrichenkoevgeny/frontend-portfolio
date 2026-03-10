import React, { useState, useRef, useEffect } from 'react';
import { cycleTheme } from '@/core/services/theme-manager';
import { setStoredLanguage, SUPPORTED_LANGUAGES } from '@/core/services/language-manager';
import type { SupportedLang } from '@/core/services/language-manager';
import { MainLayoutProps } from './types';
import styles from './MainLayout.module.css';

import icLightTheme from '@/assets/icons/ic_light_theme.svg';
import icDarkTheme from '@/assets/icons/ic_dark_theme.svg';
import icLocale from '@/assets/icons/ic_locale.svg';
import languagesData from '@/assets/locales/languages.json';

const languages = languagesData as Record<SupportedLang, { code: string; label: string }>;

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  lang,
  onLangChange,
  theme,
  onThemeChange,
  translations,
}) => {
  const t = translations[lang];
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langDropdownOpen]);

  const handleThemeClick = () => {
    const next = cycleTheme();
    onThemeChange(next);
  };

  const handleLangSelect = (newLang: 'ru' | 'en') => {
    setStoredLanguage(newLang);
    onLangChange(newLang);
    setLangDropdownOpen(false);
  };

  const scrollToSection = (sectionId: string, behavior: ScrollBehavior = 'smooth') => {
    if (sectionId === 'about') {
      window.scrollTo(0, 0);
      mainRef.current?.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior, block: 'start' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const hash = `#${sectionId}`;
    window.history.pushState(null, '', hash);
    scrollToSection(sectionId);
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const validIds = ['about', 'experience', 'stack', 'projects', 'contacts'];
    if (validIds.includes(hash)) {
      requestAnimationFrame(() => scrollToSection(hash, 'auto'));
    }
  }, []);

  const currentLangLabel = languages[lang]?.label ?? lang;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="#about" className={styles.navLink} onClick={(e) => handleNavClick(e, 'about')}>
            {t.nav_about}
          </a>
          <a href="#experience" className={styles.navLink} onClick={(e) => handleNavClick(e, 'experience')}>
            {t.nav_experience}
          </a>
          <a href="#stack" className={styles.navLink} onClick={(e) => handleNavClick(e, 'stack')}>
            {t.nav_stack}
          </a>
          <a href="#projects" className={styles.navLink} onClick={(e) => handleNavClick(e, 'projects')}>
            {t.nav_projects}
          </a>
          <a href="#contacts" className={styles.navLink} onClick={(e) => handleNavClick(e, 'contacts')}>
            {t.nav_contacts}
          </a>
        </nav>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={handleThemeClick}
            title={theme === 'light' ? t.theme_switch_to_dark : t.theme_switch_to_light}
            aria-label={theme === 'light' ? t.theme_switch_to_dark : t.theme_switch_to_light}
          >
            <img
              src={theme === 'dark' ? icLightTheme : icDarkTheme}
              alt=""
              className={styles.themeIcon}
            />
          </button>
          <div className={styles.langDropdownWrap} ref={langDropdownRef}>
            <button
              type="button"
              className={styles.langTrigger}
              onClick={() => setLangDropdownOpen((o) => !o)}
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select language"
            >
              <img src={icLocale} alt="" className={styles.langTriggerIcon} />
              {currentLangLabel}
            </button>
            {langDropdownOpen && (
              <ul
                className={styles.langDropdown}
                role="listbox"
                aria-label="Language options"
              >
                {SUPPORTED_LANGUAGES.map((option) => (
                  <li key={option} role="option" aria-selected={lang === option}>
                    <button
                      type="button"
                      className={lang === option ? styles.langOptionActive : styles.langOption}
                      onClick={() => handleLangSelect(option)}
                    >
                      {languages[option]?.label ?? option}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <main ref={mainRef} className={styles.main}>{children}</main>
    </div>
  );
};
