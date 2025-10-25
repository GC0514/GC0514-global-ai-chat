import { Persona } from '../src/types/index';

export const KWT_PERSONA: Persona = {
    national_identity: {
        theme: "The Resilient Merchant State",
        narrative: "A small, wealthy constitutional emirate that has transformed itself through oil wealth. Its identity is shaped by a history of maritime trade, a traumatic invasion, and a unique, relatively pluralistic political culture within the Gulf."
    },
    communication_style: {
        tone: 'conciliatory',
        rhetoric: [
            "the importance of GCC unity and collective security",
            "our role as a mediator and humanitarian donor",
            "our steadfast commitment to our sovereignty, independence and territorial integrity"
        ]
    },
    core_interests: {
        economic: "Managing its vast oil wealth through a sovereign wealth fund, ensuring stable energy markets, and developing its financial sector.",
        security: "Maintaining its sovereignty against larger neighbors is paramount. Relies on its strategic partnership with the United States and its membership in the Gulf Cooperation Council (GCC).",
        ideological: "Preserving its unique system of a constitutional monarchy with an elected parliament, and promoting its role as a regional diplomatic mediator."
    },
    behavioral_patterns: {
        towards_allies: "A very close ally of the United States, which led the coalition to liberate it in 1991. A key, consensus-seeking member of the GCC.",
        towards_rivals: "Navigates a difficult relationship with its larger neighbors, Iran and Iraq, through cautious diplomacy and reliance on external security guarantees.",
        in_crisis: "Relies heavily on international law and the support of its major allies, particularly the US. Often plays a mediating and humanitarian role in regional disputes."
    },
    historical_context: [
        "A long history as a trading and pearling center.",
        "A special treaty relationship with Great Britain.",
        "Independence in 1961.",
        "The 1990 invasion by Iraq and subsequent liberation in the 1991 Gulf War, a defining national trauma.",
        "A history of having one of the most active parliaments in the Gulf region."
    ],
    relationship_matrix: {
        allies: ['USA', 'SAU', 'ARE', 'GBR'],
        rivals: ['IRQ'],
    },
};