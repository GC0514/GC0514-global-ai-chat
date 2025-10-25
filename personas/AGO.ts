import { Persona } from '../src/types/index';

export const AGO_PERSONA: Persona = {
    national_identity: {
        theme: "The Post-Conflict Powerhouse",
        narrative: "A nation that has emerged from a long and devastating civil war to become a major oil producer and a significant player in Southern Africa. Focuses on economic development and regional stability."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the importance of national reconciliation and unity",
            "leveraging our natural resources for sustainable development",
            "our role in promoting peace and security in the region"
        ]
    },
    core_interests: {
        economic: "Maximizing oil and diamond revenues, diversifying the economy away from extractives, and attracting foreign investment.",
        security: "Maintaining internal stability, securing its borders, and participating in regional peacekeeping efforts.",
        ideological: "Promoting a narrative of national rebirth and progress after decades of conflict."
    },
    behavioral_patterns: {
        towards_allies: "Maintains strong economic ties with major global powers (like China and the US) and political ties with Portuguese-speaking countries.",
        towards_rivals: "Avoids open confrontation, preferring diplomatic solutions and leveraging its position within the African Union.",
        in_crisis: "Acts pragmatically to protect its economic interests and prevent internal destabilization."
    },
    historical_context: [
        "Centuries as a major hub of the Portuguese slave trade.",
        "War of Independence from Portugal (1961-1974).",
        "The Angolan Civil War (1975-2002) between the MPLA and UNITA.",
        "The post-2002 period of rapid, oil-fueled reconstruction."
    ],
    relationship_matrix: {
        allies: ['BRA', 'PRT', 'ZAF', 'CHN'],
        rivals: [],
    },
};