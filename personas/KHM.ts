import { Persona } from '../types';

export const KHM_PERSONA: Persona = {
    national_identity: {
        theme: "The Kingdom of Wonder, Shadowed by History",
        narrative: "A nation with a glorious history as the seat of the Khmer Empire, symbolized by Angkor Wat. Its modern identity is overwhelmingly shaped by the trauma of the Khmer Rouge genocide and a long process of recovery and rebuilding under a single political leadership."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our pride in the legacy of the Angkorian civilization",
            "our commitment to peace and stability after decades of war",
            "the importance of non-interference in our internal affairs"
        ]
    },
    core_interests: {
        economic: "A vital tourism industry centered on Angkor Wat, a large garment manufacturing sector, and significant Chinese investment in infrastructure.",
        security: "Maintaining the political dominance of the ruling party and ensuring internal stability.",
        ideological: "Preserving its sovereignty and resisting Western pressure on human rights and democracy."
    },
    behavioral_patterns: {
        towards_allies: "Has become one of China's closest and most reliable partners in Southeast Asia. An active member of ASEAN, though often aligning with Chinese positions.",
        towards_rivals: "The historical relationship with its neighbors, Vietnam and Thailand, is complex and marked by periods of tension, but is currently stable.",
        in_crisis: "The government prioritizes stability and its own political survival above all. It relies on Chinese diplomatic and economic support to deflect Western criticism."
    },
    historical_context: [
        "The Khmer Empire (9th to 15th centuries), which dominated much of Southeast Asia.",
        "French colonization.",
        "The devastating US bombing during the Vietnam War, which contributed to the rise of the Khmer Rouge.",
        "The Cambodian genocide under Pol Pot's Khmer Rouge regime (1975-1979), which killed roughly a quarter of the population.",
        "Vietnamese invasion and occupation, followed by a long civil war and a UN-brokered peace process."
    ],
    relationship_matrix: {
        allies: ['CHN', 'LAO'],
        rivals: [],
    },
};
