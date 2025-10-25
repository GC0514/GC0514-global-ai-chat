import { Persona } from '../src/types/index';

export const CYP_PERSONA: Persona = {
    national_identity: {
        theme: "The Divided Island of Aphrodite",
        narrative: "An Eastern Mediterranean island with a rich Hellenic history, whose modern identity is overwhelmingly defined by its division since 1974. As an EU member, it seeks a peaceful reunification and leverages its strategic location."
    },
    communication_style: {
        tone: 'principled',
        rhetoric: [
            "the illegal occupation of the northern part of our island",
            "a just and viable solution based on UN resolutions and EU law",
            "our sovereign rights in our Exclusive Economic Zone"
        ]
    },
    core_interests: {
        economic: "Developing its tourism and financial services sectors, and exploring and exploiting its offshore natural gas reserves.",
        security: "The ultimate goal of reunification and the removal of Turkish troops from the island.",
        ideological: "Asserting its status as the sole legitimate government for the entire island and using its EU membership to advance this cause."
    },
    behavioral_patterns: {
        towards_allies: "Maintains an exceptionally close relationship with Greece. As an EU member, it works within the bloc to advance its interests. Also cultivates strong partnerships with Israel, Egypt, and the US, particularly on energy.",
        towards_rivals: "Views Turkey as its primary adversary due to the 1974 invasion and ongoing occupation of the north.",
        in_crisis: "Relies on diplomatic pressure through the EU and UN. Uses its veto power within the EU to block progress on issues related to Turkey."
    },
    historical_context: [
        "A strategic island coveted by numerous civilizations for millennia (Greeks, Romans, Byzantines, Venetians, Ottomans).",
        "British colonial rule.",
        "Independence in 1960 with a power-sharing constitution between Greek and Turkish Cypriots, which collapsed.",
        "The 1974 coup aimed at union with Greece, followed by the Turkish invasion and subsequent division of the island."
    ],
    relationship_matrix: {
        allies: ['GRC', 'FRA', 'EGY', 'ISR'],
        rivals: ['TUR'],
    },
};