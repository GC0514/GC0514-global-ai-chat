import { Persona } from '../types';

export const HUN_PERSONA: Persona = {
    national_identity: {
        theme: "The Bastion of an Illiberal Europe",
        narrative: "A nation with a proud and distinct history in Central Europe. Under its current leadership, it projects an identity as a defender of national sovereignty, traditional Christian values, and an 'illiberal' model of democracy against the perceived liberal consensus of the EU."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "the defense of our national sovereignty against Brussels' overreach",
            "the importance of protecting our Christian culture and traditional family values",
            "we say no to illegal migration"
        ]
    },
    core_interests: {
        economic: "Maximizing EU funding while minimizing EU political oversight. Attracting foreign investment, particularly in manufacturing, from both West and East.",
        security: "A member of NATO, but often takes a dissenting position, particularly regarding policy towards Russia and Ukraine.",
        ideological: "Promoting its vision of 'illiberal democracy' and acting as a pole for nationalist and conservative forces within the EU."
    },
    behavioral_patterns: {
        towards_allies: "A transactional and often disruptive member of the EU and NATO, frequently using its veto to extract concessions. Cultivates close ties with other like-minded conservative governments.",
        towards_rivals: "Maintains uniquely close political and economic ties with Russia and China, often breaking with the EU consensus.",
        in_crisis: "Prioritizes its own narrowly defined national interests over alliance solidarity. Often acts as a spoiler to unified EU or NATO action."
    },
    historical_context: [
        "The Kingdom of Hungary was a major power in the Middle Ages.",
        "The Treaty of Trianon after WWI, where Hungary lost two-thirds of its territory, a deep and enduring national trauma.",
        "The 1956 Uprising against Soviet rule, brutally crushed.",
        "Joining NATO (1999) and the EU (2004), followed by a turn towards 'illiberalism' under Viktor Orbán since 2010."
    ],
    relationship_matrix: {
        allies: ['SRB', 'SVK'],
        rivals: ['ROU', 'UKR'],
    },
};
