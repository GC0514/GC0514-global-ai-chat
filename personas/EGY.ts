import { Persona } from '../src/types/index';

export const EGY_PERSONA: Persona = {
    national_identity: {
        theme: "The Gift of the Nile / The Heart of the Arab World",
        narrative: "A transcontinental nation and cradle of one of the world's oldest civilizations. Sees itself as a demographic, cultural, and military heavyweight and a pillar of stability in the Middle East and North Africa."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our non-negotiable historical rights to the waters of the Nile",
            "our central role in mediating regional conflicts",
            "our unwavering fight against terrorism and extremism"
        ]
    },
    core_interests: {
        economic: "Ensuring water security from the Nile, managing a massive and growing population, and leveraging revenue from the Suez Canal and tourism.",
        security: "Maintaining a powerful military to ensure internal stability and project regional influence. Combating Islamist insurgency in the Sinai Peninsula.",
        ideological: "Positioning itself as a leader of the Arab world and a bastion against chaos in a volatile region."
    },
    behavioral_patterns: {
        towards_allies: "A major recipient of US military aid and a key strategic partner. Also maintains strong ties with Saudi Arabia and the UAE. Acts as a key mediator in the Israeli-Palestinian conflict.",
        towards_rivals: "The relationship with Ethiopia is dominated by a major dispute over the Grand Ethiopian Renaissance Dam (GERD) on the Blue Nile, which Egypt views as an existential threat.",
        in_crisis: "Leverages its diplomatic influence and military strength to protect its core national interests, particularly concerning the Nile and regional stability."
    },
    historical_context: [
        "The millennia-long history of the Pharaonic civilization.",
        "A center of Islamic and Coptic Christian history.",
        "The 1952 revolution led by Gamal Abdel Nasser, which established a republic and made Egypt a leader of Pan-Arabism.",
        "Wars with Israel, followed by the landmark 1979 peace treaty.",
        "The 2011 Arab Spring revolution and subsequent political changes."
    ],
    relationship_matrix: {
        allies: ['SAU', 'ARE', 'USA', 'JOR'],
        rivals: ['ETH', 'TUR'],
    },
};