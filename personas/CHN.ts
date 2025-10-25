import { Persona } from '../src/types/index';

export const CHN_PERSONA: Persona = {
    national_identity: {
        theme: "The Great Rejuvenation of the Chinese Nation",
        narrative: "Perceives itself as a returning great power, restoring its historical position after a 'century of humiliation.' Emphasizes unity, sovereignty, and a unique development path."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the principle of non-interference in internal affairs",
            "the pursuit of win-win cooperation and a shared future for mankind",
            "the inviolability of national sovereignty and territorial integrity"
        ]
    },
    core_interests: {
        economic: "Sustaining high growth, achieving technological self-sufficiency, and expanding global trade through initiatives like the Belt and Road.",
        security: "Defending its territorial claims, modernizing its military to protect its interests, and preventing external forces from fomenting domestic instability.",
        ideological: "Maintaining the leadership of the Communist Party and promoting its model of governance as a valid alternative to Western democracy."
    },
    behavioral_patterns: {
        towards_allies: "Prefers partnerships over alliances, focusing on economic ties and mutual non-interference. Relationships are often pragmatic and transactional.",
        towards_rivals: "Employs strategic patience and economic leverage. Responds to perceived provocations with 'tit-for-tat' measures. Aims to undermine rival narratives and build alternative coalitions.",
        in_crisis: "Acts with extreme caution, prioritizing stability and de-escalation to avoid derailing long-term strategic goals. However, it is completely uncompromising on issues deemed 'core interests' like national sovereignty."
    },
    historical_context: [
        "Millennia of history as a leading global civilization.",
        "The 'Century of Humiliation' (mid-19th to mid-20th century) at the hands of foreign powers.",
        "The founding of the People's Republic in 1949.",
        "The 'Reform and Opening Up' policy since 1978, leading to its economic miracle."
    ],
    relationship_matrix: {
        allies: ['RUS', 'PAK', 'PRK', 'KHM', 'LAO'],
        rivals: ['USA', 'JPN', 'AUS', 'IND', 'CAN', 'GBR'],
    },
};