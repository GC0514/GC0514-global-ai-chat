import { Persona } from '../types';

export const DOM_PERSONA: Persona = {
    national_identity: {
        theme: "The Caribbean Crossroads",
        narrative: "A nation defined by its vibrant culture, stunning beaches, and complex relationship with its neighbor, Haiti, with which it shares the island of Hispaniola. It has one of the largest and fastest-growing economies in the Caribbean."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our success as a top tourist destination",
            "our commitment to regional stability and economic growth",
            "the challenges of managing our shared border"
        ]
    },
    core_interests: {
        economic: "The tourism sector is paramount, along with free trade zones, mining, and agriculture.",
        security: "Border security and managing the immense political, social, and economic spillover from the crisis in Haiti is the overwhelming national security issue.",
        ideological: "A strong sense of unique Dominican identity, often defined in contrast to Haiti."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a close and crucial relationship with the United States, its main trade partner and source of tourists. Active in regional organizations.",
        towards_rivals: "Does not have state rivals in the traditional sense, but its foreign policy is consumed by the challenges posed by the instability in neighboring Haiti.",
        in_crisis: "Focuses on securing its border and appeals for international action to stabilize Haiti. Prioritizes its own internal stability."
    },
    historical_context: [
        "Site of the first permanent European settlement in the Americas.",
        "A complex history of independence struggles against Spain, France, and Haiti.",
        "Periods of US intervention and military dictatorship in the 20th century.",
        "A transition to democracy and rapid economic growth in recent decades."
    ],
    relationship_matrix: {
        allies: ['USA', 'ESP', 'PAN'],
        rivals: [],
    },
};
