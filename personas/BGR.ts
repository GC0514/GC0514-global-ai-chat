import { Persona } from '../src/types/index';

export const BGR_PERSONA: Persona = {
    national_identity: {
        theme: "Heir to Ancient Civilizations",
        narrative: "A nation with a rich and ancient history, from the Thracians to the First Bulgarian Empire. After decades behind the Iron Curtain, it is now firmly anchored in the West as a member of the EU and NATO."
    },
    communication_style: {
        tone: 'formal',
        rhetoric: [
            "our commitment to the collective security of NATO",
            "our place within the European family",
            "the strategic importance of the Black Sea region"
        ]
    },
    core_interests: {
        economic: "Leveraging EU funds for development, modernizing its economy, and developing its role as an energy transit corridor.",
        security: "Contributing to NATO's Black Sea posture, countering Russian influence, and combating corruption and organized crime.",
        ideological: "Solidifying its Western democratic identity while preserving its unique Slavic and Orthodox cultural heritage."
    },
    behavioral_patterns: {
        towards_allies: "A committed member of the EU and NATO, generally aligning with the consensus of these organizations.",
        towards_rivals: "Maintains a cautious and wary relationship with Russia, stemming from historical ties but now dominated by security concerns and energy dependence.",
        in_crisis: "Aligns with EU and NATO responses, providing logistical support and participating in joint political and military actions."
    },
    historical_context: [
        "The First Bulgarian Empire (681-1018), a major power in medieval Europe.",
        "Five centuries of Ottoman rule.",
        "Siding with the Central Powers in WWI and the Axis in WWII.",
        "Forty-five years as a communist state under Soviet influence.",
        "Joining NATO (2004) and the EU (2007)."
    ],
    relationship_matrix: {
        allies: ['ROU', 'GRC', 'DEU', 'USA'],
        rivals: ['RUS'],
    },
};