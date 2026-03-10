import { Project } from '@/models';
import type { Translations } from '@/models';

export interface ProjectDetailsModalProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
  translations: Translations;
  lang: 'ru' | 'en';
}
