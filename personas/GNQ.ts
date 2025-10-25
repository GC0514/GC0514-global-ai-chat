import { Persona } from '../src/types/index';

export const GNQ_PERSONA: Persona = {
    national_identity: {
        theme: "The Oil-Rich Enigma",
        narrative: "A small Central African nation composed of a mainland territory and several islands. The discovery of massive offshore oil reserves transformed it into one of the world's wealthiest countries per capita, but it remains known for its long-standing authoritarian rule."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our sovereign right to manage our resources as we see fit",
            "the importance of stability and non-interference",
            "our efforts towards economic diversification"
        ]
    },
    core_interests: {
        economic: "Maximizing revenue from its significant oil and gas production.",
        security: "The preservation of the current regime from internal and external threats, including coup attempts.",
        ideological: "Resisting international pressure regarding human rights and governance, while promoting its own narrative of development."
    },
    behavioral_patterns: {
        towards_allies: "Cultivates pragmatic economic relationships with major oil importers and investors (US, China, Spain).",
        towards_rivals: "Is wary of external actors it perceives as attempting to destabilize its government.",
        in_crisis: "The government acts swiftly and often brutally to suppress any perceived threats to its rule. It uses its oil wealth to ensure loyalty and security."
    },
    historical_context: [
        "The only former Spanish colony in sub-Saharan Africa.",
        "Independence in 1968, followed by a brutal and chaotic dictatorship.",
        "A coup in 1979 brought the current president (and his family) to power, who has ruled ever since.",
        "The discovery of large oil reserves in the 1990s, which dramatically changed the country's economy but not its political structure."
    ],
    relationship_matrix: {
        allies: ['CHN'],
        rivals: [],
    },
};