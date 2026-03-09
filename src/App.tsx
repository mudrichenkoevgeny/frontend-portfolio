import React, { useState } from 'react';
import { ProjectCard } from './components/project_card/ProjectCard';
import { getLocalizedExperience } from './js/ExperienceMapper';

import experienceRaw from './data/experience.json';

import ruCommon from './locales/ru/common.json';
import ruCategories from './locales/ru/experience_categories.json';
import ruNames from './locales/ru/experience_names.json';
import ruProjects from './locales/ru/projects.json';
import ruRoles from './locales/ru/roles.json';

import enCommon from './locales/en/common.json';
import enCategories from './locales/en/experience_categories.json';
import enProjects from './locales/en/projects.json';
import enRoles from './locales/en/roles.json';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');

  const translations = {
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
    <div className="app-container">
      <header>
        <div className="lang-switcher">
          <button onClick={() => setLang('ru')} disabled={lang === 'ru'}>RU</button>
          <button onClick={() => setLang('en')} disabled={lang === 'en'}>EN</button>
        </div>
      </header>

      <main className="projects-grid">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            translations={translations} 
            lang={lang} 
          />
        ))}
      </main>
    </div>
  );
};

export default App;