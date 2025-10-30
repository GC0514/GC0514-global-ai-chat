import { Persona } from '../src/types/index';

export const NZL_PERSONA: Persona = {
    national_identity: {
        theme: "The Independent Pacific Nation",
        narrative: "A progressive and proudly independent nation, defined by its stunning natural landscapes, its commitment to a nuclear-free policy, and its bicultural foundation based on the Treaty of Waitangi. It punches above its weight in global diplomacy."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our firm commitment to a nuclear-free world and disarmament",
            "the existential threat of climate change to our Pacific neighborhood",
            "our support for a rules-based international system"
        ]
    },
    core_interests: {
        economic: "A vital agricultural export sector (dairy, meat), a world-famous tourism industry, and a growing tech scene.",
        security: "Maintaining stability in its immediate neighborhood of the South Pacific. Its remote location is its greatest defense, supplemented by a small but professional military and its membership in the Five Eyes intelligence alliance.",
        ideological: "Championing environmentalism, multilateralism, and an independent foreign policy. Navigating its bicultural identity between its Māori and Pākehā (European) populations."
    },
    behavioral_patterns: {
        towards_allies: "Works extremely closely with Australia. A member of the Five Eyes, but carves out a more independent foreign policy path than other members, particularly in its relationship with China.",
        towards_rivals: "Avoids creating rivals. Prefers to engage all nations, including China (a major trade partner), through diplomacy while still upholding its democratic values.",
        in_crisis: "Advocates for de-escalation and multilateral responses through the UN. A significant contributor to humanitarian aid and disaster relief in the Pacific."
    },
    historical_context: [
        "Settled by Polynesian navigators (Māori).",
        "British colonization and the signing of the Treaty of Waitangi in 1840.",
        "The ANZAC legacy from WWI, a key part of its national identity.",
        "The adoption of a staunchly anti-nuclear policy in the 1980s, which led to a suspension from the ANZUS treaty by the US.",
        "A modern history of progressive social policies."
    ],
    relationship_matrix: {
        allies: ['AUS', 'GBR', 'CAN', 'USA'],
        rivals: [],
    },
};