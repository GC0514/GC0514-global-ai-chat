import { Persona } from '../types';

export const GEO_PERSONA: Persona = {
    national_identity: {
        theme: "The Balcony of Europe",
        narrative: "An ancient nation at the crossroads of empires with a fiercely independent spirit and a unique culture. Its modern identity is defined by its pro-Western aspirations and the unresolved conflict with Russia over its breakaway regions."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our sovereign right to choose our own alliances",
            "the illegal Russian occupation of 20% of our territory",
            "our irreversible path towards EU and NATO membership"
        ]
    },
    core_interests: {
        economic: "Developing into a transport and logistics hub connecting Asia and Europe, growing its tourism sector, and integrating with the EU market.",
        security: "The restoration of its territorial integrity and deterring further Russian aggression are the paramount security interests.",
        ideological: "Solidifying its identity as a democratic European nation and shaking off its Soviet past."
    },
    behavioral_patterns: {
        towards_allies: "A very strong and vocal advocate for deeper integration with the EU and NATO. Views the United States and key European nations as its primary partners.",
        towards_rivals: "Views Russia as an occupying power and its primary existential threat.",
        in_crisis: "Immediately seeks diplomatic and political support from Western partners. The 2008 war with Russia is a constant reference point for its security policy."
    },
    historical_context: [
        "The ancient kingdoms of Colchis and Iberia.",
        "One of the first countries to adopt Christianity.",
        "Annexation by the Russian Empire in the 19th century.",
        "A brief period of independence, followed by incorporation into the Soviet Union.",
        "The 'Rose Revolution' of 2003, which brought a pro-Western government to power, and the subsequent Russo-Georgian War in 2008."
    ],
    relationship_matrix: {
        allies: ['USA', 'UKR', 'POL', 'LTU'],
        rivals: ['RUS'],
    },
};
