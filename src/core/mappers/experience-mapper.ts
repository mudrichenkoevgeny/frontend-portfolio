import { EXPERIENCE } from '../utils/constants';
import { getProjectDuration } from '../utils/date-utils';
import { Project, Technology } from '@/models';
import type { TranslationSchema } from '@/models';

type ExperienceEntry = { id: string; name: string; cat: string };

function findTechByKey(techKey: string): ExperienceEntry | null {
  const entries = Object.values(EXPERIENCE) as ExperienceEntry[];
  return entries.find((e) => e.id === techKey) ?? null;
}

export function getLocalizedExperience(
  rawJson: Array<{
    id: string;
    period: { start: string; end: string | null };
    role_id: string;
    company: string;
    project_key: string;
    stack: string[];
    is_pet?: boolean;
    url?: string | null;
  }>,
  translations: Record<'ru' | 'en', TranslationSchema>,
  lang: 'ru' | 'en'
): Project[] {
  return rawJson.map((item) => {
    const duration = getProjectDuration(
      item.period.start,
      item.period.end,
      lang,
      translations[lang]
    );
    const projectTranslation = translations[lang].projects[item.project_key];

    const mappedStack: Technology[] = item.stack.map((techKey: string) => {
      const techInfo = findTechByKey(techKey);
      if (!techInfo) {
        return {
          id: techKey,
          name: techKey,
          category: 'languages',
        };
      }
      const name = translations[lang].tech_names?.[techInfo.id] ?? techInfo.name;
      return {
        id: techInfo.id,
        name,
        category: techInfo.cat as Technology['category'],
      };
    });

    return {
      id: item.id,
      name: projectTranslation?.name ?? item.id,
      company: item.company,
      role_display_name: translations[lang].roles[item.role_id] ?? item.role_id,
      description: projectTranslation?.description ?? '',
      period: {
        start: item.period.start,
        end: item.period.end,
        display_period: duration.period,
        display_total: duration.total,
      },
      stack: mappedStack,
      highlights: projectTranslation?.highlights ?? [],
      role_id: item.role_id,
      project_key: item.project_key,
      is_pet: item.is_pet ?? false,
      responsibilities: [],
      url: item.url ?? null,
    };
  });
}
