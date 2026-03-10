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
  | 'hardware' 
  | 'integrations'
  | 'ai_tools';

export interface Technology {
  id: string;
  name: string;
  category: TechCategory;
}