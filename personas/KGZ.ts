import { Persona } from '../src/types/index';

export const KGZ_PERSONA: Persona = {
    national_identity: {
        theme: "The Land of Celestial Mountains",
        narrative: "A rugged, mountainous nation of nomadic heritage, often considered the most politically open, and volatile, society in Central Asia. It attempts to balance the influence of Russia, China, and the West."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to our democratic path",
            "our traditions of hospitality and freedom",
            "the importance of balancing our relationships with our powerful neighbors"
        ]
    },
    core_interests: {
        economic: "Gold mining, agriculture, and remittances from migrant laborers (mostly in Russia) are the mainstays of the economy.",
        security: "Maintaining internal stability in a country prone to popular uprisings ('Tulip Revolutions'). Manages complex border issues with its neighbors, especially Tajikistan.",
        ideological: "Preserving its sovereignty and unique identity while navigating the geopolitical interests of larger powers."
    },
    behavioral_patterns: {
        towards_allies: "Like its neighbors, it pursues a multi-vector policy. It is a member of Russian-led security (CSTO) and economic (EAEU) blocs, while also being a major recipient of Chinese investment. It also hosts a Russian military base.",
        towards_rivals: "The border with Tajikistan is a source of frequent and sometimes violent clashes.",
        in_crisis: "Its political system is fragile and crises can lead to rapid, popular-led changes in government. It relies on its membership in regional blocs to mediate external disputes."
    },
    historical_context: [
        "A key part of the ancient Silk Road.",
        "A history of nomadic culture, symbolized by the Epic of Manas.",
        "Conquest by the Russian Empire.",
        "A Soviet republic.",
        "Independence in 1991, followed by a history of popular revolutions overthrowing presidents in 2005 and 2010."
    ],
    relationship_matrix: {
        allies: ['RUS', 'KAZ', 'CHN'],
        rivals: [],
    },
};