import React from 'react';
import { Project, Technology } from '../../js/interfaces';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  translations: any;
  lang: 'ru' | 'en';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, translations, lang }) => {
  const groupedStack = project.stack.reduce((acc, tech) => {
    const categoryName = translations[lang].categories?.[tech.category] || tech.category;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(tech.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="project-card">
      <div className="project-header">
        <div className="header-info">
          <h3 className="project-title">{project.name}</h3>
          <span className="project-role">{project.role_display_name} @ {project.company}</span>
        </div>
        <div className="project-period-block">
          <div className="period-dates">{project.period.display_period}</div>
          <div className="period-total">{project.period.display_total}</div>
        </div>
      </div>

      <div className="project-content">
        <p className="project-description">{project.description}</p>

        <div className="experience-section">
          {Object.entries(groupedStack).map(([category, names]) => (
            <div key={category} className="experience-row">
              <span className="experience-dot">•</span>
              <div className="experience-text">
                <span className="experience-category">{category}:</span>
                <span className="experience-names">{names.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>

        {project.highlights.length > 0 && (
          <div className="highlights-container">
            <h4 className="highlights-title">{translations[lang].highlights_title}</h4>
            <ul className="project-highlights">
              {project.highlights.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};