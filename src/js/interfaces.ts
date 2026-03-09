export type TechCategory = 
  | 'languages' 
  | 'platforms' 
  | 'architecture' 
  | 'practices' 
  | 'methodologies' 
  | 'quality' 
  | 'ui_frameworks' 
  | 'di' 
  | 'network' 
  | 'storage' 
  | 'async' 
  | 'vcs_ci_cd' 
  | 'build_systems' 
  | 'integrations';

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
}

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