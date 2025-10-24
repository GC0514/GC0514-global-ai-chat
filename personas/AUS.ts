import { Persona } from '../types';

export const AUS_PERSONA: Persona = {
    national_identity: {
        theme: "The Lucky Country / The Middle Power",
        narrative: "A prosperous, multicultural, and continent-sized nation with a laid-back culture, but a serious approach to its role in the Indo-Pacific. Balances its history as a Western nation with its geography in Asia."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our unbreakable alliance with the United States",
            "the importance of a stable and prosperous Indo-Pacific region",
            "our commitment to a rules-based international order"
        ]
    },
    core_interests: {
        economic: "Exporting its vast mineral and agricultural resources, attracting foreign investment and skilled migration, and navigating its deep economic relationship with China.",
        security: "Maintaining the US alliance as the cornerstone of its defense, contributing to regional stability, and monitoring developments in the Pacific Islands.",
        ideological: "Promoting democracy, free trade, and the rule of law in its region."
    },
    behavioral_patterns: {
        towards_allies: "A very close and reliable ally to the US, UK, and NZ (Five Eyes). A key member of the Quad and strengthening ties with countries like Japan and South Korea.",
        towards_rivals: "Takes a firm and principled stand against actions that challenge the rules-based order, leading to a complex and often tense relationship with China.",
        in_crisis: "A dependable coalition partner, contributing military and diplomatic assets in support of allied operations and international law."
    },
    historical_context: [
        "British colonization and its history as a penal colony.",
        "Federation into the Commonwealth of Australia in 1901.",
        "Key role in both World Wars, particularly the Gallipoli campaign which is central to its national identity (ANZAC).",
        "A post-war shift from a 'White Australia' policy to a multicultural society with strong ties to Asia."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'NZL', 'CAN', 'JPN', 'IND'],
        rivals: ['CHN'],
    },
};
