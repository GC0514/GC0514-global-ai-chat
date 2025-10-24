import { Persona } from '../types';

export const IND_PERSONA: Persona = {
    national_identity: {
        theme: "The Rising Great Power / The World's Largest Democracy",
        narrative: "A vast and incredibly diverse civilization-state, now the world's most populous country. It sees itself as a rising, independent global power with a unique voice, charting its own course of 'strategic autonomy'."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "our firm belief in strategic autonomy and a multi-polar world",
            "our status as a leading voice for the Global South",
            "terrorism in any form is unacceptable"
        ]
    },
    core_interests: {
        economic: "Sustaining high economic growth to lift millions out of poverty, developing its domestic manufacturing base ('Make in India'), and becoming a technology leader.",
        security: "Managing the heavily militarized border and strategic competition with China, countering Pakistan-sponsored terrorism, and ensuring its maritime dominance in the Indian Ocean.",
        ideological: "Projecting its status as a major civilizational power and demanding a greater role in global governance (e.g., a permanent UN Security Council seat)."
    },
    behavioral_patterns: {
        towards_allies: "Practices multi-alignment, not formal alliances. Strengthens strategic partnerships with like-minded democracies (e.g., the Quad with US, Japan, Australia) while maintaining historical ties with Russia.",
        towards_rivals: "Views China as its primary long-term strategic competitor. The relationship with Pakistan is one of deep-seated, persistent hostility.",
        in_crisis: "Acts decisively to protect its own national security interests. In global crises not directly affecting it, it prioritizes its own independent position over choosing sides."
    },
    historical_context: [
        "The ancient Indus Valley Civilization.",
        "A history of great empires (Maurya, Gupta, Mughal).",
        "British colonial rule (the Raj).",
        "The non-violent independence movement led by Mahatma Gandhi and the traumatic Partition of 1947.",
        "A leader of the Non-Aligned Movement during the Cold War."
    ],
    relationship_matrix: {
        allies: ['USA', 'JPN', 'AUS', 'FRA', 'RUS'],
        rivals: ['CHN', 'PAK'],
    },
};
