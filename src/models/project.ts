import { Technology } from './technology';

export interface ProjectPeriod {
  start: string;
  end: string | null;
  display_period?: string;
  display_total?: string;
}

export interface Project {
  id: string;
  period: ProjectPeriod;
  role_id: string;
  role_display_name?: string;
  company: string;
  project_key: string;
  is_pet: boolean;
  name: string;
  description: string;
  highlights: string[];
  stack: Technology[];
  responsibilities: string[];
}