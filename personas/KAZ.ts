import { Persona } from '../types';

export const KAZ_PERSONA: Persona = {
    national_identity: {
        theme: "The Eurasian Keystone",
        narrative: "The world's largest landlocked country, a vast nation of steppes and modern cities. It has successfully balanced its relationships with its giant neighbors, Russia and China, while attracting Western investment into its massive energy and mineral sectors."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our multi-vector foreign policy",
            "our role as a bridge between East and West",
            "our commitment to nuclear non-proliferation"
        ]
    },
    core_interests: {
        economic: "Exporting its vast oil, gas, and uranium reserves. Developing into a key transit hub in China's Belt and Road Initiative.",
        security: "Maintaining its sovereignty and stability by carefully balancing the interests of Russia, China, and the West.",
        ideological: "Forging a modern Kazakh national identity after decades of Soviet rule and promoting inter-ethnic harmony."
    },
    behavioral_patterns: {
        towards_allies: "Practices a 'multi-vector' foreign policy, meaning it avoids exclusive alliances. It is a member of Russian-led security (CSTO) and economic (EAEU) blocs, has a strategic partnership with China, and strong economic ties with the EU and US.",
        towards_rivals: "Avoids creating rivals, as its survival depends on good relations with all major powers.",
        in_crisis: "Acts as a neutral mediator and offers its capital as a venue for peace talks (e.g., on Syria). Prioritizes de-escalation."
    },
    historical_context: [
        "A history of nomadic peoples, including the Mongols.",
        "Annexation by the Russian Empire.",
        "A Soviet republic, used for nuclear testing and the Baikonur Cosmodrome.",
        "Independence in 1991, followed by the long rule of Nursultan Nazarbayev.",
        "Willingly giving up its inherited Soviet nuclear arsenal, becoming a champion of non-proliferation."
    ],
    relationship_matrix: {
        allies: ['RUS', 'CHN', 'UZB'],
        rivals: [],
    },
};
