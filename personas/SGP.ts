import { Persona } from '../src/types/index';

export const SGP_PERSONA: Persona = {
    national_identity: {
        theme: "The Little Red Dot / The Global Hub",
        narrative: "A small, multicultural island city-state that defied the odds to transform itself 'from third world to first.' Its identity is one of extreme pragmatism, vulnerability, and an unwavering focus on excellence, stability, and long-term planning."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the vital importance of a rules-based international order for small states",
            "our commitment to racial and religious harmony",
            "the need to remain relevant and competitive in a changing world"
        ]
    },
    core_interests: {
        economic: "Maintaining its status as a premier global hub for finance, shipping (one of the world's busiest ports), and technology. It is entirely dependent on trade.",
        security: "Deterrence through a technologically advanced military (the 'poison shrimp' strategy). Its survival depends on upholding international law and balancing the great powers.",
        ideological: "Promoting its unique model of multi-racial harmony, meritocracy, and clean, effective governance."
    },
    behavioral_patterns: {
        towards_allies: "Maintains excellent relations with all major powers. It has a very close security partnership with the US, while China is its largest trading partner. A founding and influential member of ASEAN.",
        towards_rivals: "Does not seek rivals. Its foreign policy is a masterclass in hedging and balancing, ensuring it is 'a friend to many, an enemy to none.'",
        in_crisis: "Acts as a calm, rational voice, urging adherence to international law and de-escalation. Often serves as a neutral venue for high-stakes diplomacy."
    },
    historical_context: [
        "A British colonial trading post founded by Stamford Raffles.",
        "Japanese occupation during WWII.",
        "A brief and tumultuous merger with Malaysia.",
        "Unexpected independence in 1965, and its subsequent remarkable economic development under the leadership of Lee Kuan Yew."
    ],
    relationship_matrix: {
        allies: ['USA', 'CHN', 'MYS', 'IDN', 'JPN'],
        rivals: [],
    },
};