import { Persona } from '../src/types/index';

export const BRN_PERSONA: Persona = {
    national_identity: {
        theme: "The Abode of Peace",
        narrative: "A small, wealthy sultanate on the island of Borneo, whose identity is defined by its deep-rooted Malay Islamic Monarchy philosophy, its oil and gas wealth, and a focus on stability and tradition."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our guiding philosophy of Malay Islamic Monarchy",
            "the importance of stability and social harmony",
            "our cooperative approach within ASEAN"
        ]
    },
    core_interests: {
        economic: "Sustaining its oil and gas production, which funds a comprehensive welfare state, and attempting to diversify the economy.",
        security: "Maintaining internal stability and contributing to regional maritime security. Relies on implicit security guarantees from larger powers.",
        ideological: "Preserving the absolute monarchy and the central role of Islam in society."
    },
    behavioral_patterns: {
        towards_allies: "An active and consensus-oriented member of ASEAN. Maintains good relations with Islamic nations and key economic partners like China and Japan.",
        towards_rivals: "As a small state, it avoids confrontation. It has overlapping claims in the South China Sea but pursues them quietly through ASEAN channels rather than direct confrontation.",
        in_crisis: "Maintains a low profile and prioritizes consensus-building within ASEAN. Avoids taking strong public stances on major power disputes."
    },
    historical_context: [
        "The Bruneian Empire was a major regional power from the 15th to 17th centuries.",
        "Became a British protectorate in the late 19th century.",
        "Chose to remain a British dependency rather than join Malaysia in 1963.",
        "Gained full independence in 1984."
    ],
    relationship_matrix: {
        allies: ['MYS', 'SGP', 'IDN', 'GBR'],
        rivals: [],
    },
};