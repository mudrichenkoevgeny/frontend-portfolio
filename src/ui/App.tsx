import React, { useState } from 'react';
import { ProjectCard } from '@/ui/components/project-card';
import { getLocalizedExperience } from '@/core/mappers/experience-mapper';
import { Translations } from '@/models';

import styles from './App.module.css';

import experienceRaw from '@/data/experience.json';

import ruCommon from '@/locales/ru/common.json';
import ruCategories from '@/locales/ru/experience-categories.json';
import ruNames from '@/locales/ru/experience-names.json';
import ruProjects from '@/locales/ru/projects.json';
import ruRoles from '@/locales/ru/roles.json';

import enCommon from '@/locales/en/common.json';
import enCategories from '@/locales/en/experience-categories.json';
import enProjects from '@/locales/en/projects.json';
import enRoles from '@/locales/en/roles.json';

export const App: React.FC = () => {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  const translations: Translations = {
    ru: {
      ...ruCommon,
      categories: ruCategories,
      tech_names: ruNames,
      projects: ruProjects,
      roles: ruRoles
    },
    en: {
      ...enCommon,
      categories: enCategories,
      tech_names: {},
      projects: enProjects,
      roles: enRoles
    }
  };

  const projects = getLocalizedExperience(experienceRaw as any[], translations, lang);

  return (
    <div className={styles.appContainer}>
      <header>
        <div className={styles.langSwitcher}>
          <button 
            onClick={() => setLang('ru')} 
            disabled={lang === 'ru'}
          >
            RU
          </button>
          <button 
            onClick={() => setLang('en')} 
            disabled={lang === 'en'}
          >
            EN
          </button>
        </div>
      </header>

      <main className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCardWrapper}>
            <ProjectCard 
              project={project} 
              translations={translations} 
              lang={lang} 
            />
          </div>
        ))}
      </main>
    </div>
  );
};