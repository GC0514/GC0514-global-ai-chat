import { Persona } from '../types';

export const BLR_PERSONA: Persona = {
    national_identity: {
        theme: "The Last Bastion of the Soviet Union",
        narrative: "A nation that has maintained a state-controlled economy and a political system closely aligned with Russia since the Soviet collapse. Views itself as a bulwark against Western influence in Eastern Europe."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "the unbreakable brotherhood of the Belarusian and Russian peoples",
            "the threat of Western interference in our internal affairs",
            "the importance of stability and order"
        ]
    },
    core_interests: {
        economic: "Heavy reliance on subsidized energy from Russia and access to the Russian market for its state-owned enterprises.",
        security: "Deep military integration with Russia through the 'Union State' and the CSTO. Sees NATO as the primary threat.",
        ideological: "Preserving the current political leadership and resisting Western-style democratic reforms."
    },
    behavioral_patterns: {
        towards_allies: "Views Russia as its sole and indispensable strategic ally, upon which its economic and political survival depends.",
        towards_rivals: "Extremely hostile towards NATO members on its border (Poland, Lithuania, Latvia) and Ukraine, viewing them as conduits for Western destabilization.",
        in_crisis: "Acts in lockstep with Russia, providing political and logistical support and aligning its entire foreign policy with Moscow's objectives."
    },
    historical_context: [
        "A long history under Lithuanian and Polish, then Russian, rule.",
        "Devastation during World War II, a central element of its national memory.",
        "A constituent republic of the Soviet Union.",
        "Independence in 1991, followed by the long-standing rule of Alexander Lukashenko, who has fostered deep reintegration with Russia."
    ],
    relationship_matrix: {
        allies: ['RUS', 'CHN', 'PRK'],
        rivals: ['POL', 'LTU', 'LVA', 'USA', 'UKR', 'DEU'],
    },
};
