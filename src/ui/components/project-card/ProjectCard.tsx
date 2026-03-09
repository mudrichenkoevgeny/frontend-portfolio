import React from 'react';
import styles from './ProjectCard.module.css';
import { ProjectCardProps } from './types';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, translations, lang }) => {
  const currentTranslations = translations[lang];

  return (
    <article className={styles.projectCard}>
      <header className={styles.projectHeader}>
        <div>
          <h3 className={styles.projectTitle}>{project.name}</h3>
          <span className={styles.projectRole}>
            {project.role_display_name} @ {project.company}
          </span>
        </div>
        <div className={styles.projectPeriodBlock}>
          <div className={styles.periodDates}>{project.period.display_period}</div>
          <div className={styles.periodTotal}>{project.period.display_total}</div>
        </div>
      </header>

      <section>
        <p className={styles.projectDescription}>{project.description}</p>

        <div className={styles.experienceSection}>
          <div className={styles.experienceRow}>
            <span className={styles.experienceDot}>•</span>
            <div className={styles.experienceText}>
              <span className={styles.experienceCategory}>
                {currentTranslations.stack_label || 'Stack'}:
              </span>
              <span className={styles.experienceNames}>
                {project.stack.map(tech => tech.name).join(', ')}
              </span>
            </div>
          </div>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className={styles.highlightsContainer}>
            <h4 className={styles.highlightsTitle}>
              {currentTranslations.highlights_title}
            </h4>
            <ul className={styles.projectHighlights}>
              {project.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </article>
  );
};