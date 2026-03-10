const STORAGE_KEY = 'user_language';

export type SupportedLang = 'ru' | 'en';

export const SUPPORTED_LANGUAGES: SupportedLang[] = ['ru', 'en'];

export function getPreferredLanguage(): SupportedLang {
  const urlParams = new URLSearchParams(window.location.search);
  const queryLang = urlParams.get('lang');
  if (queryLang === 'ru' || queryLang === 'en') return queryLang;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'ru' || saved === 'en') return saved;

  const browserLang = navigator.language.substring(0, 2);
  return browserLang === 'ru' ? 'ru' : 'en';
}

export function setStoredLanguage(lang: SupportedLang): void {
  localStorage.setItem(STORAGE_KEY, lang);
}
