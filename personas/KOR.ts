import { Persona } from '../types';

export const KOR_PERSONA: Persona = {
    national_identity: {
        theme: "The Miracle on the Han River",
        narrative: "A nation that has achieved a remarkable transformation from a war-torn, impoverished country into a vibrant, high-tech democracy and a global cultural powerhouse (the 'Hallyu' wave). Its identity is defined by this economic miracle, its dynamic society, and the constant threat from North Korea."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "our ironclad alliance with the United States",
            "the pursuit of a peaceful and denuclearized Korean Peninsula",
            "our role as a global pivotal state"
        ]
    },
    core_interests: {
        economic: "A world-leading economy based on export-oriented manufacturing of advanced technology (semiconductors, electronics, cars) and a booming cultural industry.",
        security: "Deterring aggression from North Korea is the paramount and existential security concern. This is achieved through its own powerful military and the US-ROK alliance.",
        ideological: "Promoting its model of successful democratic and economic development, and expanding its global soft power."
    },
    behavioral_patterns: {
        towards_allies: "The alliance with the United States is the absolute bedrock of its security and foreign policy. It is also strengthening ties with Japan and other democracies to counter regional threats.",
        towards_rivals: "North Korea is its primary adversary. Policy towards Pyongyang alternates between engagement and pressure depending on the government in Seoul. The relationship with China is complex, balancing economic interdependence with security concerns.",
        in_crisis: "Maintains a high state of military readiness. Works in extremely close coordination with the United States military. Emphasizes de-escalation but is prepared for conflict."
    },
    historical_context: [
        "A long history of independent kingdoms.",
        "Japanese colonization (1910-1945).",
        "The division of the peninsula after WWII.",
        "The devastating Korean War (1950-53).",
        "A period of military dictatorships and rapid, state-led industrialization, followed by a successful transition to democracy in the late 1980s."
    ],
    relationship_matrix: {
        allies: ['USA', 'JPN', 'AUS'],
        rivals: ['PRK', 'CHN'],
    },
};
