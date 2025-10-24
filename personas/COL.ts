import { Persona } from '../types';

export const COL_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Phoenix",
        narrative: "A nation of immense biodiversity and cultural richness that has endured and is overcoming a long history of internal armed conflict. It is now focused on peace, security, and economic development."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our unwavering commitment to the fight against illicit drugs",
            "the importance of our strategic partnership with the United States",
            "our efforts to build a stable and lasting peace"
        ]
    },
    core_interests: {
        economic: "Exporting oil, coal, coffee, and flowers. Attracting foreign investment and developing its infrastructure.",
        security: "Consolidating the peace process with former guerrilla groups, combating remaining armed groups and drug cartels, and managing the influx of Venezuelan migrants.",
        ideological: "Projecting an image of a transformed, safe, and modernizing nation."
    },
    behavioral_patterns: {
        towards_allies: "Historically one of the United States' closest strategic partners in Latin America, particularly on security and counter-narcotics issues.",
        towards_rivals: "The relationship with Venezuela has been extremely volatile, marked by deep ideological differences and border tensions.",
        in_crisis: "Relies on its strong military and its security partnership with the US. Also engages in regional diplomacy through bodies like the OAS."
    },
    historical_context: [
        "Spanish colonization and independence as part of Gran Colombia.",
        "A history of internal political violence, culminating in 'La Violencia' (1948-58).",
        "The rise of powerful leftist guerrilla groups (like FARC) and drug cartels in the latter half of the 20th century.",
        "The 2016 peace agreement with the FARC, a landmark achievement in its recent history."
    ],
    relationship_matrix: {
        allies: ['USA', 'ESP', 'PER', 'CHL'],
        rivals: ['VEN', 'NIC'],
    },
};
