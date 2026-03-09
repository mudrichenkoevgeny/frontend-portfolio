import { EXPERIENCE } from './constants';
import { Project, Technology, TechCategory } from './interfaces';
import { getProjectDuration } from './DateUtils';

export function getLocalizedExperience(
    rawJson: any[], 
    translations: any, 
    lang: 'ru' | 'en'
): Project[] {
    const projectTranslations = translations[lang].projects;
    const roleTranslations = translations[lang].roles;

    return rawJson.map(item => {
        const t = projectTranslations[item.project_key];

        const enrichedStack: Technology[] = item.stack.map((techId: string) => {
            const techData = Object.values(EXPERIENCE).find((entry: any) => entry.id === techId);

            return {
                id: techId,
                name: translations[lang].tech_names?.[techId] || techData?.name || techId,
                category: (techData?.cat as TechCategory) || 'integrations'
            };
        });

        const duration = getProjectDuration(
            item.period.start, 
            item.period.end, 
            lang, 
            translations[lang]
        );

        return {
            id: item.id,
            period: {
                ...item.period,
                display_period: duration.period,
                display_total: duration.total
            },
            role_id: item.role_id,
            role_display_name: roleTranslations?.[item.role_id] || item.role_id,
            company: item.company,
            project_key: item.project_key,
            is_pet: item.is_pet,
            name: t?.name || item.project_key,
            description: t?.description || "",
            highlights: t?.highlights || [],
            responsibilities: t?.responsibilities || [],
            stack: enrichedStack
        };
    });
}