import { Persona } from '../types';

export const DNK_PERSONA: Persona = {
    national_identity: {
        theme: "The Progressive Nordic Kingdom",
        narrative: "A prosperous and socially progressive Scandinavian nation, known for its high quality of life, design heritage, and commitment to green energy. A pragmatic member of the EU and a founding member of NATO."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our commitment to a green transition and climate action",
            "the importance of the transatlantic security link",
            "our support for a rules-based international system"
        ]
    },
    core_interests: {
        economic: "Advanced sectors like pharmaceuticals, shipping (home to Maersk), and renewable energy (wind turbines). A strong focus on green technology.",
        security: "Collective defense through NATO. Its strategic importance is amplified by its sovereignty over Greenland and the Faroe Islands, which are key to Arctic security.",
        ideological: "Championing progressive values, liberal democracy, and a strong welfare state model."
    },
    behavioral_patterns: {
        towards_allies: "A staunch NATO ally and an active, though sometimes skeptical, member of the EU (with several opt-outs, e.g., from the Euro).",
        towards_rivals: "Takes a firm line against Russia, particularly in the context of Baltic Sea and Arctic security.",
        in_crisis: "A reliable coalition partner that contributes military, financial, and humanitarian aid in line with NATO and EU positions."
    },
    historical_context: [
        "The Viking Age and the North Sea Empire.",
        "A long history as a major European power.",
        "A policy of neutrality that ended with German occupation in WWII.",
        "A founding member of NATO in 1949 and joining the EEC (now EU) in 1973."
    ],
    relationship_matrix: {
        allies: ['DEU', 'SWE', 'NOR', 'USA', 'GBR', 'NLD'],
        rivals: ['RUS'],
    },
};
