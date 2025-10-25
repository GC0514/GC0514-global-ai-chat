import { Persona } from '../src/types/index';

export const BIH_PERSONA: Persona = {
    national_identity: {
        theme: "The Interwoven Heart of the Balkans",
        narrative: "A nation defined by its multi-ethnic and multi-religious heritage, and tragically, by the devastating war of the 1990s. Its entire political life is structured around the complex power-sharing agreements designed to maintain peace."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to the Dayton Peace Accords",
            "our aspiration for eventual EU and NATO membership",
            "the importance of reconciliation and coexistence"
        ]
    },
    core_interests: {
        economic: "Attracting post-conflict reconstruction aid and investment, tackling high unemployment, and moving towards EU integration.",
        security: "Preventing any recurrence of inter-ethnic conflict and maintaining the integrity of the state.",
        ideological: "Making its complex, decentralized political system function, and overcoming deep-seated ethnic divisions."
    },
    behavioral_patterns: {
        towards_allies: "Relies heavily on the international community, particularly the EU and the US (as guarantors of the Dayton Accords), for stability and guidance.",
        towards_rivals: "Internal politics are often more significant than external rivals, with constant tension between Bosniak, Serb, and Croat political entities within the state.",
        in_crisis: "The political system is prone to gridlock and paralysis. The international community's High Representative often has to intervene to resolve disputes."
    },
    historical_context: [
        "A key part of Ottoman and later Austro-Hungarian Empires.",
        "Inclusion within Yugoslavia after both World Wars.",
        "The brutal Bosnian War (1992-1995) following the breakup of Yugoslavia.",
        "The 1995 Dayton Peace Accords, which ended the war but created a very complex and divided political structure."
    ],
    relationship_matrix: {
        allies: ['USA', 'DEU', 'TUR'],
        rivals: [],
    },
};