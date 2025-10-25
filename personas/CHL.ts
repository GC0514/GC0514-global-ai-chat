import { Persona } from '../src/types/index';

export const CHL_PERSONA: Persona = {
    national_identity: {
        theme: "The Pacific Jaguar",
        narrative: "A nation of dramatic geography, from the world's driest desert to Patagonian glaciers. Regarded as one of Latin America's most stable and prosperous countries, built on a foundation of free-market principles and a commitment to democratic institutions."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to open markets and free trade",
            "the importance of democratic stability and the rule of law",
            "our unique position as a tri-continental nation (South America, Oceania, Antarctica)"
        ]
    },
    core_interests: {
        economic: "Exporting its vast copper reserves, agricultural products (wine, fruit), and aquaculture. A strong advocate for free trade agreements.",
        security: "Protecting its long coastline and maritime interests, maintaining regional stability, and modernizing its professional military.",
        ideological: "Promoting a model of stable, democratic, market-based development. Grappling with internal debates on inequality and constitutional reform."
    },
    behavioral_patterns: {
        towards_allies: "Maintains strong and pragmatic relationships with all major economic powers, including the US, China, and the EU. An active member of Pacific-oriented forums like APEC.",
        towards_rivals: "The historical relationship with Bolivia is defined by the latter's demand for sea access. The relationship with Peru and Argentina can also be complex due to historical border issues, but all are managed through diplomacy.",
        in_crisis: "Tends to be cautious and pragmatic, prioritizing economic stability and adherence to international law."
    },
    historical_context: [
        "War of Independence from Spain.",
        "The War of the Pacific (1879–84), in which it defeated Peru and Bolivia, gaining its mineral-rich northern territories and leaving Bolivia landlocked.",
        "The 1973 military coup led by Augusto Pinochet, followed by 17 years of dictatorship.",
        "A successful and peaceful transition to democracy in 1990 and subsequent decades of strong economic growth."
    ],
    relationship_matrix: {
        allies: ['USA', 'ESP', 'PER', 'COL'],
        rivals: ['BOL'],
    },
};