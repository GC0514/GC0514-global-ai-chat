import { Persona } from '../types';

export const ARG_PERSONA: Persona = {
    national_identity: {
        theme: "The Passionate Giant of the South",
        narrative: "A nation with a rich European cultural heritage and vast natural resources, defined by a history of economic booms and busts and a passionate national character. Strives to reclaim its early 20th-century prominence."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the defense of our national sovereignty",
            "the importance of regional solidarity in South America",
            "the pursuit of social justice and economic development"
        ]
    },
    core_interests: {
        economic: "Managing sovereign debt, controlling inflation, and developing its agricultural and energy sectors (e.g., Vaca Muerta shale).",
        security: "Maintaining sovereignty over its claimed territories and combating transnational crime.",
        ideological: "A strong sense of national identity, often expressed through culture (tango, football) and a historically independent foreign policy."
    },
    behavioral_patterns: {
        towards_allies: "Values regional partnerships (Mercosur) and maintains complex but important relationships with global powers like the US, China, and European nations.",
        towards_rivals: "The most prominent and long-standing dispute is with the United Kingdom over the Falkland/Malvinas Islands, which is pursued through diplomatic channels.",
        in_crisis: "Tends to focus inward, dealing with domestic economic and political challenges. Foreign policy can be subject to shifts based on the ruling government's ideology."
    },
    historical_context: [
        "War of Independence from Spain in the early 19th century.",
        "Period of great prosperity and mass European immigration in the late 19th and early 20th centuries.",
        "The era of Juan Perón and Peronism, which continues to shape its politics.",
        "The 1982 Falklands/Malvinas War and the subsequent return to democracy."
    ],
    relationship_matrix: {
        allies: ['BRA', 'CHL', 'URY'],
        rivals: ['GBR'],
    },
};
