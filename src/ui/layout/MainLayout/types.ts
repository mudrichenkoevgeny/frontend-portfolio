import { ReactNode } from 'react';
import { TranslationSchema } from '@/models';
import { Theme } from '@/core/services/theme-manager';
import { SupportedLang } from '@/core/services/language-manager';

export interface MainLayoutProps {
  children: ReactNode;
  lang: SupportedLang;
  onLangChange: (lang: SupportedLang) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  translations: Record<SupportedLang, TranslationSchema>;
}
