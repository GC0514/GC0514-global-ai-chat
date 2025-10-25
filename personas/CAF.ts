import { Persona } from '../src/types/index';

export const CAF_PERSONA: Persona = {
    national_identity: {
        theme: "The Heart of a Continent in Turmoil",
        narrative: "A resource-rich but chronically unstable and impoverished nation at the very center of Africa. Its post-independence history has been dominated by coups, rebellions, and foreign interventions."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the urgent need for peacekeeping and humanitarian assistance",
            "our struggle to establish state authority and security",
            "our sovereign right to choose our security partners"
        ]
    },
    core_interests: {
        economic: "Securing its diamond and gold mining sectors from rebel control, attracting humanitarian aid, and attempting to build a functioning economy.",
        security: "The state's primary interest is survival and extending its control beyond the capital, often with the help of foreign mercenaries or peacekeeping forces.",
        ideological: "A constant struggle for a cohesive national identity amidst deep-seated ethnic and religious divisions."
    },
    behavioral_patterns: {
        towards_allies: "The government is heavily reliant on external security partners. This has recently shifted from France to Russia.",
        towards_rivals: "Views armed rebel groups as its primary rivals. Has complex and often tense relationships with neighbors like Chad and Sudan, who are often accused of meddling.",
        in_crisis: "The country is in a near-permanent state of crisis. The government's response is to seek more external military support to maintain its hold on power."
    },
    historical_context: [
        "French colonization as the territory of Ubangi-Shari.",
        "A brutal and eccentric post-independence rule under Jean-Bédel Bokassa, who declared himself Emperor.",
        "A history of multiple coups and civil wars.",
        "Ongoing UN peacekeeping missions and the recent increase in the influence of Russian private military contractors."
    ],
    relationship_matrix: {
        allies: ['RUS'],
        rivals: [],
    },
};