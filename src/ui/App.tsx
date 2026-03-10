import React, { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/ui/layout/MainLayout';
import { ProjectCard } from '@/ui/components/project-card';
import { ProjectDetailsModal } from '@/ui/components/project-details-modal';
import { getLocalizedProject } from '@/core/mappers/project-mapper';
import { getAggregatedStackFromExperience, groupStackByCategory } from '@/core/utils/stack-utils';
import { getProjectDuration } from '@/core/utils/date-utils';
import type { Project } from '@/models';
import { Translations } from '@/models';
import { getPreferredLanguage, setStoredLanguage } from '@/core/services/language-manager';
import { getStoredTheme, applyTheme, Theme } from '@/core/services/theme-manager';

import styles from './App.module.css';

import projectRaw from '@/data/projects.json';
import careerRaw from '@/data/career.json';
import contactsData from '@/data/contacts.json';
import avatarImage from '@/assets/images/avatar.jpg';
import icTelegram from '@/assets/icons/ic_telegram.svg';
import icEmail from '@/assets/icons/ic_email.svg';
import icGithub from '@/assets/icons/ic_github.svg';

import ruCommon from '@/locales/ru/common.json';
import ruCategories from '@/locales/ru/experience-categories.json';
import ruNames from '@/locales/ru/experience-names.json';
import ruProjects from '@/locales/ru/projects.json';
import ruRoles from '@/locales/ru/roles.json';
import ruAboutMe from '@/locales/ru/about-me.json';

import enCommon from '@/locales/en/common.json';
import enCategories from '@/locales/en/experience-categories.json';
import enProjects from '@/locales/en/projects.json';
import enRoles from '@/locales/en/roles.json';
import enAboutMe from '@/locales/en/about-me.json';

const translations: Translations = {
  ru: {
    ...ruCommon,
    categories: ruCategories,
    tech_names: ruNames,
    projects: ruProjects,
    roles: ruRoles,
    lang_name_ru: ruCommon.lang_name_ru ?? 'Русский',
    lang_name_en: ruCommon.lang_name_en ?? 'English',
  },
  en: {
    ...enCommon,
    categories: enCategories,
    tech_names: {},
    projects: enProjects,
    roles: enRoles,
    lang_name_ru: enCommon.lang_name_ru ?? 'Russian',
    lang_name_en: enCommon.lang_name_en ?? 'English',
  },
};

const aboutMeByLang = { ru: ruAboutMe as { about_me: string; experience?: string[] }, en: enAboutMe as { about_me: string; experience?: string[] } };
const contacts = contactsData as Record<string, { value: string; link: string; icon?: string }>;
const contactIcons: Record<string, string> = {
  'ic_telegram.svg': icTelegram,
  'ic_email.svg': icEmail,
  'ic_github.svg': icGithub,
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<'ru' | 'en'>(getPreferredLanguage);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const handleLangChange = (newLang: 'ru' | 'en') => {
    setStoredLanguage(newLang);
    setLang(newLang);
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectsScrollRef = useRef<HTMLDivElement | null>(null);
  const wheelCleanupRef = useRef<(() => void) | null>(null);
  const projects = getLocalizedProject(projectRaw as never[], translations, lang);
  const aggregatedStack = getAggregatedStackFromExperience(projectRaw as Array<{ stack: string[] }>, lang, translations);
  const groupedStack = groupStackByCategory(aggregatedStack);
  const aboutMe = aboutMeByLang[lang];
  const experienceList = aboutMe.experience ?? [];

  type CareerEntry = { id: string; period: { start: string; end: string | null }; role_id: string; company: string | null; is_freelance: boolean };
  const tForCareer = translations[lang];
  const careerList = (careerRaw as CareerEntry[]).map((item) => {
    const duration = getProjectDuration(item.period.start, item.period.end, lang, tForCareer);
    const roleDisplayName = tForCareer.roles[item.role_id] ?? item.role_id;
    const companyDisplay = item.is_freelance ? tForCareer.freelance : (item.company ?? '');
    return {
      key: `${item.id}-${item.period.start}-${item.role_id}`,
      companyDisplay,
      roleDisplayName,
      periodText: `${duration.period} (${duration.total})`,
    };
  });

  const setProjectsScrollRef = (el: HTMLDivElement | null) => {
    if (wheelCleanupRef.current) {
      wheelCleanupRef.current();
      wheelCleanupRef.current = null;
    }
    projectsScrollRef.current = el;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    wheelCleanupRef.current = () => el.removeEventListener('wheel', onWheel);
  };

  useEffect(() => () => wheelCleanupRef.current?.(), []);

  const showToast = (message: string, durationMs = 2500) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, durationMs);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { value: string; link: string }) => {
    if (!item.link.startsWith('mailto:')) return;
    e.preventDefault();
    const email = item.value || item.link.replace(/^mailto:/i, '').split('?')[0].trim();
    navigator.clipboard.writeText(email).then(
      () => showToast(translations[lang].email_copied_toast),
      () => showToast(translations[lang].email_copied_toast)
    );
  };

  useEffect(() => () => { if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current); }, []);

  const t = translations[lang];

  return (
    <MainLayout
      lang={lang}
      onLangChange={handleLangChange}
      theme={theme}
      onThemeChange={setTheme}
      translations={translations}
    >
      <section className={styles.section}>
        <div id="about" className={`${styles.sectionSep} ${styles.sectionSepNoLine}`} aria-hidden="true" />
        <h2 className={styles.sectionTitle}>{t.person_name}</h2>
        <div className={styles.aboutSection}>
          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>{aboutMe.about_me}</p>
          </div>
          <div className={styles.aboutImageWrap}>
            <img src={avatarImage} alt="" className={styles.avatarCircle} />
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div id="experience" className={styles.sectionSep} aria-hidden="true" />
        <h2 className={styles.sectionTitle}>{t.nav_experience}</h2>
        <ul className={styles.skillsList}>
          {experienceList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div id="stack" className={styles.sectionSep} aria-hidden="true" />
        <h2 className={styles.sectionTitle}>{t.stack_label}</h2>
        {groupedStack.map(({ category, techs }) => (
          <div key={category} className={styles.stackSectionGroup}>
            <p className={styles.stackSectionLine}>
              <span className={styles.stackCategoryName}>{t.categories[category] ?? category}:</span>{' '}
              {techs.map((tech) => tech.name).join(', ')}
            </p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div id="career" className={styles.sectionSep} aria-hidden="true" />
        <h2 className={styles.sectionTitle}>{t.nav_career}</h2>
        <ul className={styles.careerList}>
          {careerList.map((item) => (
            <li key={item.key} className={styles.careerItem}>
              <p className={styles.careerMeta}>
                {item.companyDisplay}
                {item.companyDisplay && item.roleDisplayName ? ' · ' : ''}
                {item.roleDisplayName}
              </p>
              <p className={styles.careerPeriod}>{item.periodText}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <div id="projects" className={styles.sectionSep} aria-hidden="true" />
        <h2 className={styles.projectsSectionTitle}>{t.nav_projects}</h2>
        <div className={styles.projectsContainer}>
          <div ref={setProjectsScrollRef} className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project.id} className={styles.cardWrapper}>
                <ProjectCard
                  project={project}
                  translations={translations}
                  lang={lang}
                  onMoreDetails={setSelectedProject}
                />
              </div>
            ))}
          </div>
          <div className={styles.edgeMaskLeft} aria-hidden="true" />
          <div className={styles.edgeMaskRight} aria-hidden="true" />
        </div>
      </section>

      <footer className={styles.contactsFooter}>
        <div id="contacts" className={styles.sectionSep} aria-hidden="true" />
        <h2 className={styles.contactsTitle}>{t.nav_contacts}</h2>
        <ul className={styles.contactsList}>
          {Object.entries(contacts).map(([key, item]) => (
            <li key={key} className={styles.contactItem}>
              <a
                href={item.link}
                target={item.link.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className={styles.contactLink}
                onClick={(e) => handleContactClick(e, item)}
              >
                {item.icon && contactIcons[item.icon] && (
                  <img src={contactIcons[item.icon]} alt="" className={styles.contactIcon} />
                )}
                {item.value}
              </a>
            </li>
          ))}
        </ul>
      </footer>

      {toastMessage && (
        <div className={styles.toast} role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}

      <ProjectDetailsModal
        project={selectedProject}
        open={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        translations={translations}
        lang={lang}
      />
    </MainLayout>
  );
};
