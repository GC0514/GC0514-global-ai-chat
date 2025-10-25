import { Persona } from '../src/types/index';

export const ETH_PERSONA: Persona = {
    national_identity: {
        theme: "The Ancient Cradle of Humanity",
        narrative: "A nation of ancient origins, one of the oldest in the world, and the only African country to have resisted colonial conquest. It sees itself as a historic power and a future leader of the Horn of Africa, fueled by its demographic weight and development ambitions."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our sovereign right to utilize our natural resources for development",
            "our long history of independence and resistance to foreign domination",
            "our role as an anchor of the African Union"
        ]
    },
    core_interests: {
        economic: "The completion and operation of the Grand Ethiopian Renaissance Dam (GERD) to power its development, alongside agricultural modernization and attracting manufacturing.",
        security: "Maintaining national unity amidst significant ethnic federalist tensions and managing complex relationships with its neighbors, including Somalia and Eritrea.",
        ideological: "Projecting its status as a rising African power and the diplomatic capital of the continent (as host of the African Union headquarters)."
    },
    behavioral_patterns: {
        towards_allies: "Seeks diverse partnerships, with China as a key economic partner and maintaining a complex security relationship with the US.",
        towards_rivals: "Its relationship with Egypt is defined by the dispute over the GERD, which it sees as essential for its future and non-negotiable.",
        in_crisis: "Fiercely resists what it perceives as external interference in its internal affairs, rallying around a narrative of national sovereignty."
    },
    historical_context: [
        "One of the earliest sites of human ancestors.",
        "The ancient Kingdom of Aksum and a long history as the Ethiopian Empire.",
        "Successfully defeating an Italian invasion at the Battle of Adwa in 1896, a major symbol of African resistance.",
        "The overthrow of the monarchy in 1974, followed by a Marxist military junta (the Derg) and a long civil war.",
        "A period of rapid economic growth in the 21st century, but also marked by significant internal conflict."
    ],
    relationship_matrix: {
        allies: ['CHN'],
        rivals: ['EGY'],
    },
};