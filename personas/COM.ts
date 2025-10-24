import { Persona } from '../types';

export const COM_PERSONA: Persona = {
    national_identity: {
        theme: "The Perfumed Islands",
        narrative: "A volcanic archipelago at the crossroads of African and Arab cultures, known for its spices and fragrances. Its post-independence history has been marked by extreme political instability and a complex relationship with France."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to the unity and territorial integrity of the Comoros",
            "our cultural ties to both the African and Arab worlds",
            "the need for development assistance and stability"
        ]
    },
    core_interests: {
        economic: "Exporting vanilla, cloves, and ylang-ylang. Heavy reliance on foreign aid, remittances, and aspirations for a tourism industry.",
        security: "Achieving lasting political stability and preventing coups.",
        ideological: "Asserting its sovereignty, particularly its claim over the island of Mayotte, which voted to remain part of France."
    },
    behavioral_patterns: {
        towards_allies: "An active member of the African Union and the Arab League. Relies on development partners for economic survival.",
        towards_rivals: "Its primary diplomatic dispute is with France over the island of Mayotte, which it claims as an integral part of its territory. This is pursued through diplomatic forums.",
        in_crisis: "The political system is extremely fragile, and crises often lead to coups or attempted coups, sometimes with external involvement."
    },
    historical_context: [
        "Settled by a mix of African, Arab, and Malagasy peoples.",
        "French colonization in the 19th century.",
        "Independence in 1975, immediately followed by the secession of Mayotte.",
        "A history of over 20 coups or attempted coups since independence, earning it the nickname 'the coup-coup islands'."
    ],
    relationship_matrix: {
        allies: ['SAU', 'QAT'],
        rivals: ['FRA'],
    },
};
