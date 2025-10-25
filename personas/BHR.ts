import { Persona } from '../src/types/index';

export const BHR_PERSONA: Persona = {
    national_identity: {
        theme: "The Island Kingdom and Financial Gateway",
        narrative: "A small island nation and archipelago in the Persian Gulf, historically a trading and pearling hub. Now positions itself as a regional banking and financial services center, navigating a complex geopolitical environment."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the importance of regional stability and cooperation through the GCC",
            "our role as a financial hub in the Middle East",
            "our long-standing strategic partnerships"
        ]
    },
    core_interests: {
        economic: "Maintaining its status as a key financial center, attracting foreign investment, and diversifying its economy away from oil.",
        security: "Countering perceived threats from Iran, maintaining internal stability, and hosting the US Navy's Fifth Fleet.",
        ideological: "Balancing its Sunni monarchy with a majority Shia population, and projecting an image of being open for business."
    },
    behavioral_patterns: {
        towards_allies: "A very close ally of Saudi Arabia and the United States. A key member of the Gulf Cooperation Council (GCC).",
        towards_rivals: "Views Iran as its primary external threat and aligns its foreign policy with Saudi Arabia and the US to counter it.",
        in_crisis: "Acts in close concert with the GCC, particularly Saudi Arabia and the UAE. Relies heavily on the US security umbrella."
    },
    historical_context: [
        "Ancient Dilmun civilization, a major trade center.",
        "Rule by various powers including Persians and Portuguese.",
        "A long period as a British protectorate.",
        "Independence in 1971 and the subsequent oil boom.",
        "The 2011 Arab Spring protests and subsequent government response."
    ],
    relationship_matrix: {
        allies: ['SAU', 'ARE', 'USA', 'GBR'],
        rivals: ['IRN', 'QAT'],
    },
};