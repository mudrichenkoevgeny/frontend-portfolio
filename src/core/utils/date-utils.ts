import { TranslationSchema } from '@/models';

export const getProjectDuration = (
  start: string, 
  end: string | null, 
  lang: 'ru' | 'en', 
  translations: TranslationSchema
) => {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth() + 1;

  if (months < 0) {
    years--;
    months += 12;
  }
  if (months === 12) {
    years++;
    months = 0;
  }

  const getLabel = (value: number, type: 'year' | 'month') => {
    if (lang === 'en') return type === 'year' ? (value === 1 ? 'yr' : 'yrs') : 'mos.';
    
    const v = Math.abs(value) % 100;
    const v10 = v % 10;
    if (v > 10 && v < 20) return translations.duration_units[`${type}_5`];
    if (v10 > 1 && v10 < 5) return translations.duration_units[`${type}_2`];
    if (v10 === 1) return translations.duration_units[`${type}_1`];
    return translations.duration_units[`${type}_5`];
  };

  const result = [];
  if (years > 0) result.push(`${years} ${getLabel(years, 'year')}`);
  if (months > 0) result.push(`${months} ${getLabel(months, 'month')}`);

  const formatter = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric' });
  const startStr = formatter.format(startDate);
  const endStr = end ? formatter.format(endDate) : translations.present;
  const cap = (s: string) => s.replace(/^\S/, (c) => c.toUpperCase());
  const period =
    lang === 'ru'
      ? `${cap(startStr)} — ${end ? cap(endStr) : translations.present}`
      : `${startStr} — ${end ? endStr : translations.present}`;

  return {
    period,
    total: result.join(' ')
  };
};