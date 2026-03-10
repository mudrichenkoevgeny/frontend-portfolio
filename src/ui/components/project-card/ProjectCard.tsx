import React from 'react';
import { ProjectCardProps } from './types';
import styles from './ProjectCard.module.css';
import goToBtnStyles from '@/ui/styles/go-to-button.module.css';

const PET_PROJECT_LABEL = 'Pet Project';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  translations,
  lang,
  onMoreDetails,
}) => {
  const t = translations[lang];
  const showCompany = project.company !== PET_PROJECT_LABEL;

  const handleClick = () => {
    onMoreDetails?.(project);
  };

  const handleBtnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoreDetails?.(project);
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onMoreDetails?.(project);
        }
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleBlock}>
          <span className={styles.role}>{project.role_display_name}</span>
          <h3 className={styles.title}>{project.name}</h3>
        </div>
        {showCompany && (
          <span className={styles.company}>{project.company}</span>
        )}
      </div>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.cardFooter}>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={goToBtnStyles.goToBtn}
            onClick={(e) => e.stopPropagation()}
          >
            {t.go_to}
          </a>
        )}
        <button
          type="button"
          className={styles.moreDetailsBtn}
          onClick={handleBtnClick}
        >
          {t.more_details}
        </button>
      </div>
    </article>
  );
};
