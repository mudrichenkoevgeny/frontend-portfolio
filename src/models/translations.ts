export interface DurationUnits {
  year_1: string;
  year_2: string;
  year_5: string;
  month_1: string;
  month_2: string;
  month_5: string;
}

export interface ProjectTranslation {
  name: string;
  description: string;
  highlights: string[];
}

export interface TranslationSchema {
  present: string;
  stack_label: string;
  highlights_title: string;
  more_details: string;
  go_to: string;
  person_name: string;
  nav_about: string;
  nav_experience: string;
  nav_stack: string;
  nav_projects: string;
  nav_contacts: string;
  theme_switch_to_dark: string;
  theme_switch_to_light: string;
  lang_name_ru: string;
  lang_name_en: string;
  duration_units: DurationUnits;
  categories: Record<string, string>;
  tech_names: Record<string, string>;
  projects: Record<string, ProjectTranslation>;
  roles: Record<string, string>;
}

export type Translations = Record<'ru' | 'en', TranslationSchema>;