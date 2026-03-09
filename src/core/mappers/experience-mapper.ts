import { EXPERIENCE } from "../utils/constants";
import { getProjectDuration } from "../utils/date-utils";
import { Project, Technology } from "@/models";

export function getLocalizedExperience(
    rawJson: any[],
    translations: any,
    lang: 'ru' | 'en'
): Project[] {
    return rawJson.map(item => {
        const duration = getProjectDuration(
            item.period.start,
            item.period.end,
            lang,
            translations[lang]
        );

        const mappedStack: Technology[] = item.stack.map((techKey: string) => {
            const techInfo = (EXPERIENCE as any)[techKey.toUpperCase()];
            
            if (!techInfo) {
                return {
                    id: techKey,
                    name: techKey,
                    category: 'languages'
                };
            }

            return {
                id: techInfo.id,
                name: translations[lang].tech_names?.[techInfo.id] || techInfo.name,
                category: techInfo.cat
            };
        });

        return {
            id: item.id,
            name: item.name,
            company: item.company,
            role_display_name: translations[lang].roles[item.role] || item.role,
            description: item.description?.[lang] || "",
            period: {
                start: item.period.start,
                end: item.period.end,
                display_period: duration.period,
                display_total: duration.total
            },
            stack: mappedStack,
            highlights: item.highlights?.[lang] || [],
            role_id: item.role || "",
            project_key: item.id || "",
            is_pet: item.is_pet ?? false,
            responsibilities: item.responsibilities?.[lang] || []
        };
    });
}