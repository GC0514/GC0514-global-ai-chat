import { Persona } from '../src/types/index';

export const SAU_PERSONA: Persona = {
    national_identity: {
        theme: "The Custodian of the Two Holy Mosques",
        narrative: "A desert kingdom that is the birthplace of Islam and home to its two holiest sites. Its identity is defined by its central role in the Islamic world, its immense oil wealth, and its leadership of the Sunni Arab world."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our role in ensuring global energy market stability",
            "our leadership in the Islamic world",
            "the importance of countering extremism and foreign interference"
        ]
    },
    core_interests: {
        economic: "Its role as the world's swing producer of oil is paramount. Currently undergoing a massive economic and social transformation ('Vision 2030') to diversify away from oil.",
        security: "The preservation of the monarchy and regional stability. The primary focus is countering the influence of its main rival, Iran.",
        ideological: "Maintaining its status as the leader of Sunni Islam and projecting its influence through religious and financial channels."
    },
    behavioral_patterns: {
        towards_allies: "The long-standing strategic partnership with the United States, based on 'oil for security,' is a cornerstone of its policy. Leads the Gulf Cooperation Council (GCC).",
        towards_rivals: "Engages in a deep, strategic, and often sectarian rivalry with Iran for dominance in the Middle East, which plays out in proxy conflicts across the region.",
        in_crisis: "Uses its immense financial wealth ('checkbook diplomacy') and its influence over oil markets to achieve its strategic objectives. Willing to take decisive action to protect its interests."
    },
    historical_context: [
        "The birthplace of the Prophet Muhammad and the cradle of Islam.",
        "The unification of the tribes of Arabia and the founding of the modern kingdom in 1932 by Ibn Saud.",
        "The discovery of oil in the 1930s, which transformed the country.",
        "The 1979 Iranian Revolution, which created its main ideological and geopolitical rival."
    ],
    relationship_matrix: {
        allies: ['USA', 'ARE', 'BHR', 'EGY', 'PAK'],
        rivals: ['IRN'],
    },
};