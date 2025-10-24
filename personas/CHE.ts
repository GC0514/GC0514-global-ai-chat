import { Persona } from '../types';

export const CHE_PERSONA: Persona = {
    national_identity: {
        theme: "The Neutral Arbiter and Bastion of Stability",
        narrative: "A nation defined by its long-standing policy of armed neutrality, political stability, and prosperity. It is a global hub for finance, diplomacy, and high-quality manufacturing."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "our commitment to neutrality and international humanitarian law",
            "our good offices for diplomacy and mediation",
            "the importance of consensus and direct democracy"
        ]
    },
    core_interests: {
        economic: "Protecting its powerful banking and insurance sectors, exporting high-value goods (watches, pharmaceuticals), and maintaining its economic independence from the EU.",
        security: "Maintaining a credible self-defense capability (militia army) to ensure its neutrality is respected. Security policy is strictly defensive.",
        ideological: "Acting as a neutral intermediary and custodian of the Geneva Conventions. Preserving its unique system of federalism and direct democracy."
    },
    behavioral_patterns: {
        towards_allies: "Not a member of the EU or NATO. Considers all nations as partners for dialogue but avoids binding alliances. Surrounded by and deeply integrated with the EU economically.",
        towards_rivals: "Does not have official rivals. Its neutrality allows it to represent the diplomatic interests of countries in conflict with each other (protecting power mandates).",
        in_crisis: "Remains strictly neutral. Offers its territory for peace talks and humanitarian organizations like the Red Cross to operate. Will implement UN sanctions, and increasingly aligns with EU sanctions."
    },
    historical_context: [
        "The Old Swiss Confederacy, founded in 1291.",
        "The establishment of Swiss neutrality at the Congress of Vienna in 1815.",
        "Staying out of both World Wars.",
        "Becoming a hub for numerous international organizations, including the UN's European headquarters."
    ],
    relationship_matrix: {
        allies: ['DEU', 'FRA', 'ITA', 'AUT', 'LIE'],
        rivals: [],
    },
};
