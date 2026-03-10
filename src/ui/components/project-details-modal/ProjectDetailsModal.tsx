import React, { useEffect } from 'react';
import { groupStackByCategory } from '@/core/utils/stack-utils';
import { ProjectDetailsModalProps } from './types';
import styles from './ProjectDetailsModal.module.css';
import goToBtnStyles from '@/ui/styles/go-to-button.module.css';

const PET_PROJECT_LABEL = 'Pet Project';

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  open,
  onClose,
  translations,
  lang,
}) => {
  const t = translations[lang];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!project) {
    return (
      <div className={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalBody}>
            <div className={styles.titleRow}>
              <h2 id="modal-title" className={styles.projectTitle} />
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const showCompany = project.company !== PET_PROJECT_LABEL;
  const periodText = `${project.period.display_period ?? ''} (${project.period.display_total ?? ''})`;
  const groupedStack = groupStackByCategory(project.stack);

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalBody}>
          <section className={styles.section}>
            <div className={styles.titleRow}>
              <h2 id="modal-title" className={styles.projectTitle}>
                {project.name}
              </h2>
              <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                ×
              </button>
            </div>
            <p className={styles.meta}>
              {project.role_display_name}
              {showCompany ? ` · ${project.company}` : ''}
            </p>
            <p className={styles.periodBlock}>{periodText}</p>
            <p className={styles.description}>{project.description}</p>
          </section>

          <div className={styles.separator} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.highlights_title}</h3>
            <ul className={styles.highlightsList}>
              {project.highlights.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <div className={styles.separator} />

          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>{t.stack_label}</h3>
            {groupedStack.map(({ category, techs }) => (
              <div key={category} className={styles.stackGroup}>
                <p className={styles.stackGroupLine}>
                  <span className={styles.stackCategoryName}>
                    {t.categories[category] ?? category}:
                  </span>{' '}
                  {techs.map((tech) => tech.name).join(', ')}
                </p>
              </div>
            ))}
          </section>

          {project.url && (
            <div className={styles.modalFooter}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={goToBtnStyles.goToBtn}
              >
                {t.go_to}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
