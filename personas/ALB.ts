import { Persona } from '../src/types/index';

export const ALB_PERSONA: Persona = {
    national_identity: {
        theme: "Europe's Crossroads",
        narrative: "A nation with a unique cultural and linguistic heritage, emerging from decades of isolation to embrace European integration. Strongly pro-Western and pro-NATO."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our unwavering commitment to the Euro-Atlantic path",
            "the importance of regional cooperation in the Balkans",
            "our shared values of democracy and freedom"
        ]
    },
    core_interests: {
        economic: "Achieving full EU membership, developing its tourism sector, and attracting foreign investment.",
        security: "Full integration into NATO structures and contributing to regional stability.",
        ideological: "Solidifying its identity as a modern, secular, European democracy."
    },
    behavioral_patterns: {
        towards_allies: "A staunch and reliable ally to the United States and key EU members, often aligning its foreign policy with theirs.",
        towards_rivals: "Maintains a cautious and sometimes tense relationship with regional neighbors, particularly concerning historical issues.",
        in_crisis: "Aligns quickly with NATO and EU positions, offering support within its capabilities."
    },
    historical_context: [
        "Ancient Illyrian roots and a long period under Ottoman rule.",
        "Brief independence followed by Italian and German occupation in WWII.",
        "Decades of extreme isolation under the hardline communist regime of Enver Hoxha.",
        "The tumultuous transition to democracy in the 1990s and NATO membership in 2009."
    ],
    relationship_matrix: {
        allies: ['USA', 'ITA', 'TUR', 'HRV'],
        rivals: ['SRB'],
    },
};