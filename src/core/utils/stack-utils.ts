import { EXPERIENCE, EXPERIENCE_CATEGORIES } from './constants';
import type { Technology } from '@/models';
import type { TechCategory } from '@/models';
import type { TranslationSchema } from '@/models';

const CATEGORY_ORDER = Object.values(EXPERIENCE_CATEGORIES) as TechCategory[];

type ExperienceEntry = { id: string; name: string; cat: string };

function findTechByKey(techKey: string): ExperienceEntry | null {
  const entries = Object.values(EXPERIENCE) as ExperienceEntry[];
  return entries.find((e) => e.id === techKey) ?? null;
}

export function getAggregatedStackFromExperience(
  rawExperience: Array<{ stack: string[] }>,
  lang: 'ru' | 'en',
  translations: Record<'ru' | 'en', TranslationSchema>
): Technology[] {
  const seen = new Set<string>();
  const result: Technology[] = [];
  const t = translations[lang];
  for (const item of rawExperience) {
    for (const techKey of item.stack) {
      if (seen.has(techKey)) continue;
      seen.add(techKey);
      const techInfo = findTechByKey(techKey);
      if (!techInfo) {
        result.push({ id: techKey, name: techKey, category: 'languages' });
        continue;
      }
      const name = t.tech_names?.[techInfo.id] ?? techInfo.name;
      result.push({
        id: techInfo.id,
        name,
        category: techInfo.cat as TechCategory,
      });
    }
  }
  return result;
}

const EXPERIENCE_ORDER_IDS = (Object.values(EXPERIENCE) as ExperienceEntry[]).map((e) => e.id);

function sortTechsByExperienceOrder(techs: Technology[]): Technology[] {
  return [...techs].sort((a, b) => {
    const i = EXPERIENCE_ORDER_IDS.indexOf(a.id);
    const j = EXPERIENCE_ORDER_IDS.indexOf(b.id);
    const idxA = i === -1 ? 1e9 : i;
    const idxB = j === -1 ? 1e9 : j;
    return idxA - idxB;
  });
}

export function groupStackByCategory(stack: Technology[]): Array<{ category: TechCategory; techs: Technology[] }> {
  const map = new Map<TechCategory, Technology[]>();
  for (const cat of CATEGORY_ORDER) {
    map.set(cat, []);
  }
  for (const tech of stack) {
    const list = map.get(tech.category) ?? [];
    list.push(tech);
    map.set(tech.category, list);
  }
  return CATEGORY_ORDER
    .filter((cat) => (map.get(cat)?.length ?? 0) > 0)
    .map((category) => ({ category, techs: sortTechsByExperienceOrder(map.get(category)!) }));
}
