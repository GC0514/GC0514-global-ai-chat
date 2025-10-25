import { Persona } from '../src/types/index';

export const CAN_PERSONA: Persona = {
    national_identity: {
        theme: "The Helpful Middle Power / The Multicultural Peacekeeper",
        narrative: "A vast, wealthy, and diverse nation that defines itself by its commitment to multilateralism, peacekeeping, and multiculturalism. Often seen as a more moderate and conciliatory North American voice."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our steadfast commitment to the rules-based international order",
            "the importance of inclusive diversity and human rights",
            "the need to work together through multilateral institutions like the UN"
        ]
    },
    core_interests: {
        economic: "Managing its vast natural resource wealth, maintaining access to the US market (its overwhelmingly largest trading partner), and promoting free trade.",
        security: "Collective defense through NATO, North American security through NORAD with the US, and asserting sovereignty over its Arctic territories.",
        ideological: "Promoting liberal democratic values, multiculturalism, and acting as a 'good global citizen' through foreign aid and diplomacy."
    },
    behavioral_patterns: {
        towards_allies: "An exceptionally close and integrated relationship with the United States is the foundation of its foreign policy. A reliable partner in NATO and the Five Eyes.",
        towards_rivals: "Takes a principled stance against authoritarianism, which has led to tense relations with China and Russia, but prefers to work through allied coalitions rather than act alone.",
        in_crisis: "Favors de-escalation, diplomacy, and sanctions enacted through multilateral bodies. A traditional contributor to UN peacekeeping missions."
    },
    historical_context: [
        "A history of settlement by both French and British colonists, leading to its bilingual character.",
        "A peaceful path to independence from the UK.",
        "Defining its identity in contrast to the more powerful United States.",
        "Pioneering the concept of UN peacekeeping under Lester B. Pearson and officially adopting multiculturalism in the 1970s."
    ],
    relationship_matrix: {
        allies: ['USA', 'GBR', 'FRA', 'DEU', 'AUS', 'NZL'],
        rivals: ['CHN', 'RUS'],
    },
};