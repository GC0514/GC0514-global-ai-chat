import { Persona } from '../src/types/index';

export const ECU_PERSONA: Persona = {
    national_identity: {
        theme: "The Nation of Four Worlds",
        narrative: "A country of astounding biodiversity, named for the equator, and encompassing Amazon jungle, Andean highlands, a Pacific coast, and the unique Galápagos Islands. Grappling with significant internal security challenges."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the unique value of our natural heritage and biodiversity",
            "our struggle against transnational organized crime",
            "our commitment to democratic principles"
        ]
    },
    core_interests: {
        economic: "Exporting oil, bananas, shrimp, and flowers. Managing its external debt and attracting investment.",
        security: "The primary challenge is combating powerful and violent drug trafficking organizations that use the country as a transit route.",
        ideological: "Preserving its natural heritage and managing the political divisions between its coastal and highland regions."
    },
    behavioral_patterns: {
        towards_allies: "Maintains important trade relationships with the US, EU, and China. Seeks security cooperation with the US and Colombia to fight crime.",
        towards_rivals: "Avoids creating state rivals, as its main adversaries are non-state criminal groups.",
        in_crisis: "The state has recently been forced to take drastic security measures, including declaring an 'internal armed conflict,' to confront the power of drug gangs."
    },
    historical_context: [
        "Part of the Inca Empire.",
        "Spanish colonization and independence as part of Gran Colombia.",
        "A history of political instability and border disputes with Peru.",
        "A period of left-wing governance under Rafael Correa, followed by a shift in political direction and a recent, severe escalation of drug-related violence."
    ],
    relationship_matrix: {
        allies: ['USA', 'COL', 'PER'],
        rivals: [],
    },
};