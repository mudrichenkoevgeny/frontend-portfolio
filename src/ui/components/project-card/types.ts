import { Project } from '@/models';

export interface ProjectCardProps {
  project: Project;
  translations: any;
  lang: 'ru' | 'en';
}