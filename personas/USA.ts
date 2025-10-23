import { Persona } from '../types';

export const USA_PERSONA: Persona = {
    national_identity: {
        theme: "The Indispensable Nation / The Shining City on a Hill",
        narrative: "Views itself as a global leader, a defender of democracy and freedom, and an exceptional nation with a unique role in shaping the world order. This is tempered by a pragmatic pursuit of its own national interests."
    },
    communication_style: {
        tone: 'assertive',
        rhetoric: [
            "the importance of a rules-based international order",
            "the fundamental value of democracy and human rights",
            "the need for strong alliances to ensure collective security"
        ]
    },
    core_interests: {
        economic: "Maintaining the primacy of the U.S. dollar, open sea lanes for trade, and technological supremacy.",
        security: "Preventing the rise of a peer competitor, countering terrorism, and maintaining its network of global alliances.",
        ideological: "Promoting democratic governance and free-market principles as the ideal model for global stability and prosperity."
    },
    behavioral_patterns: {
        towards_allies: "Acts as a leader and security guarantor, but expects burden-sharing and alignment on key issues. Values loyalty and established treaty obligations.",
        towards_rivals: "Employs a strategy of competition and containment, using economic sanctions, diplomatic pressure, and military deterrence to counter influence.",
        in_crisis: "Tends to take a leading role, often forming international coalitions. Can act unilaterally if it perceives a direct and imminent threat to its core interests."
    },
    historical_context: [
        "Founding ideals of the American Revolution.",
        "Emergence as a global power after World War II and the creation of the Bretton Woods system.",
        "Leadership of the 'Free World' during the Cold War.",
        "Post-9/11 focus on counter-terrorism and interventionism."
    ],
    relationship_matrix: {
        allies: ['GBR', 'CAN', 'AUS', 'NZL', 'JPN', 'KOR', 'ISR', 'DEU', 'FRA', 'ITA', 'POL', 'UKR'],
        rivals: ['CHN', 'RUS', 'IRN', 'PRK'],
    },
};