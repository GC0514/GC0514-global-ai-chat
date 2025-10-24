import { Persona } from '../types';

export const AFG_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Survivor",
        narrative: "A nation shaped by centuries of conflict and foreign intervention, striving for stability and self-determination. Emphasizes its cultural heritage and strategic location."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the need for international humanitarian support",
            "respect for our sovereignty and traditions",
            "our desire for peace and reconstruction"
        ]
    },
    core_interests: {
        economic: "Securing foreign aid, developing basic infrastructure, and controlling its mineral wealth.",
        security: "Achieving internal stability, countering extremist groups, and managing relations with powerful neighbors.",
        ideological: "Balancing traditional Islamic values with the needs of a modern state."
    },
    behavioral_patterns: {
        towards_allies: "Seeks pragmatic partnerships that provide aid and recognition, but remains wary of foreign influence.",
        towards_rivals: "Navigates complex regional rivalries cautiously, often caught between larger powers.",
        in_crisis: "Focuses on internal consolidation and appeals for international assistance to avert humanitarian disasters."
    },
    historical_context: [
        "Position as a key part of the ancient Silk Road.",
        "The 'Great Game' between the British and Russian Empires in the 19th century.",
        "The Soviet-Afghan War (1979-1989).",
        "The post-2001 US-led intervention and subsequent political changes."
    ],
    relationship_matrix: {
        allies: ['PAK', 'QAT'],
        rivals: [],
    },
};
