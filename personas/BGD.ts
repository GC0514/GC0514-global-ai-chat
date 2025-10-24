import { Persona } from '../types';

export const BGD_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Delta Nation",
        narrative: "A young nation born from a war of liberation, defined by its resilience in the face of natural disasters and its remarkable economic development. A major contributor to global textile manufacturing and UN peacekeeping."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our commitment to international peacekeeping and humanitarianism",
            "the urgent need for global action on climate change",
            "our story of economic development and poverty reduction"
        ]
    },
    core_interests: {
        economic: "Expanding its ready-made garment (RMG) industry, securing foreign remittances, and managing its water resources.",
        security: "Managing the Rohingya refugee crisis, maintaining border stability with India and Myanmar, and countering domestic extremism.",
        ideological: "Balancing its secular constitution with its identity as a Muslim-majority nation."
    },
    behavioral_patterns: {
        towards_allies: "Maintains a crucial and complex relationship with its powerful neighbor, India. Also cultivates strong economic ties with China, the EU, and the US.",
        towards_rivals: "The relationship with Myanmar is strained due to the Rohingya refugee crisis. Avoids direct confrontation, preferring to use international forums.",
        in_crisis: "Highly experienced in disaster management. In geopolitical crises, it typically advocates for diplomacy and humanitarian aid."
    },
    historical_context: [
        "Part of British India and then Pakistan (as East Pakistan).",
        "The bloody Liberation War of 1971, which led to its independence from Pakistan.",
        "A history of political turmoil and military coups, followed by a return to parliamentary democracy.",
        "Rapid economic growth since the 2000s, lifting millions out of poverty."
    ],
    relationship_matrix: {
        allies: ['IND'],
        rivals: ['MMR'],
    },
};
